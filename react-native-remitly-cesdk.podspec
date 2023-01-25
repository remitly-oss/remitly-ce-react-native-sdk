Pod::Spec.new do |s|
  s.name         = "react-native-remitly-cesdk"
  s.version      = "1.4.1"
  s.license      = "UNLICENSED"
  s.homepage     = "https://github.com/Remitly/Narwhal"
  s.authors      = { 'Nick Hodapp' => 'nick@remitly.com' }
  s.summary      = "A React Native native module for enabling Remitly CE"
  s.source       = { :git => "https://github.com/Remitly/remitly-ce-react-native-sdk" }
  s.source_files = "ios/react-native-remitly-ce/*.{h,m,swift}"
  s.platform     = :ios, "12.0"
  s.swift_version = "5"
  s.dependency 'React'
  s.dependency 'RemitlyCEKit', '~> 0.1.8'
end
