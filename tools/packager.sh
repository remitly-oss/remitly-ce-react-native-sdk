#!/usr/bin/env bash
set -fu -o pipefail

#
# Util
#

# we won't start another packager instance if one is already running
PACKAGER_STATUS=$(curl -s "http://localhost:8081/status")
if [[ $PACKAGER_STATUS = "packager-status:running" ]]; then
    echo "Packager already running…"
    exit
fi

#
# Options
#

do_launch=false
do_help=false
PRE_PLATFORM=("")
ARGS=("")

while (( "$#" )); do
    case "$1" in
    -h | --help)
        do_help=true
        ARGS+=("--help")
        shift
        ;;
    -l | --launch)
        do_launch=true
        shift
        ;;
    -p | --prebundle)
        if [ "$2" = android -o "$2" = ios ]; then
            PRE_PLATFORM=$2
            shift 2
        else
            echo "Error: Argument for $1 is missing or invalid (must provide either 'android' or 'ios')" >&2
            exit 1
        fi
        ;;
    *)
      ARGS="$ARGS $1"
      shift
      ;;
    esac
done


if $do_help; then
    echo $(basename $0)
    echo
    echo "Options:"
    echo "    -h, --help"
    echo "        Display this help message"
    echo
    echo "    -l, --launch"
    echo "        Launch the packager in a new window"
    echo
    echo "    -p, --prebundle {android|ios}"
    echo "        Pre-generate main bundle for the selected platform as soon as the packager starts,"
    echo "        i.e. don't wait for the app to request it. This improves app startup time."
    echo
    echo "Remaining options are passed to \`react-native start\`."
    echo
    yarn react-native start --help
    exit
fi


#
# Running
#

DIR=$(cd "$(dirname "$0")"; pwd)
cd $DIR/..

if $do_launch; then
    # Create a temporary file to launch in a new terminal
    # that will re-run this packager script with new arguments.
    TEMP=$(mktemp)
    chmod +x $TEMP
    if [ -n "$PRE_PLATFORM" ]; then
        PRE_ARG="-p $PRE_PLATFORM"
    else
        PRE_ARG=("")
    fi

    cat > $TEMP <<- EOF
        rm $TEMP
        cd $DIR
        ./$(basename $0) $PRE_ARG ${ARGS[@]}
EOF

    echo $TEMP
    open -b com.apple.terminal $TEMP
    exit
fi


if [ -n "$PRE_PLATFORM" ]; then
    sleep 5 && curl -s localhost:8081/index.bundle?platform=$PRE_PLATFORM\&dev=true\&minify=false > /dev/null &
fi

if [[ $PRE_PLATFORM == "android" && ! -z ${ANDROID_HOME:+x} && -e $ANDROID_HOME/platform-tools/adb ]]; then
    $ANDROID_HOME/platform-tools/adb reverse tcp:8081 tcp:8081 > /dev/null &
fi

NODE_OPTIONS="--max-old-space-size=4096" PACKAGER=true yarn react-native start ${ARGS[@]}

