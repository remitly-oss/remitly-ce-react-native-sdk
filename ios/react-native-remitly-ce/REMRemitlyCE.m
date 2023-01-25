//
//  REMRemitlyCE.m
//  remitly-ce-react-native-sdk
//

#import "REMRemitlyCE.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(RemitlyCE, REMRemitlyCE, RCTEventEmitter)

_RCT_EXTERN_REMAP_METHOD(configure, configure: (NSDictionary*) configuration resolver: (RCTPromiseResolveBlock) resolve rejector: (RCTPromiseRejectBlock) rejector, NO)
_RCT_EXTERN_REMAP_METHOD(present, presentWithResolver: (RCTPromiseResolveBlock) resolve rejector: (RCTPromiseRejectBlock) rejector, NO)
RCT_EXTERN_METHOD(dismiss:(BOOL)logout)

@end
