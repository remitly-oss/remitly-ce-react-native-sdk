//
//  RemitlyCE.swift
//  remitly-ce-react-native-sdk
//

import Foundation
import RemitlyCEKit
import React

enum RemitlyCeEvents: String {
    case TransferSubmitted = "RemitlyTransferSubmitted"
    case UserActivity = "RemitlyUserActivity"
    case Error = "RemitlyError"
}

public class RemitlyConfiguration : Codable {
    let webHost: String?
    let apiHost: String?
    let appId: String?
    let defaultSendCountry: String?
    let defaultReceiveCountry: String?
    let customerEmail: String?
    let languageCode: String?
}

@objc(REMRemitlyCE) 
open class RemitlyCE: RCTEventEmitter, RemitlyCeViewControllerDelegate {

    var presentRemitlyCompletion: RCTPromiseResolveBlock?
    
    var remitlyViewController: RemitlyCeViewController?

    @objc 
    static public override func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc 
    open override var methodQueue: DispatchQueue {
      get {
        return DispatchQueue.main
      }
    }
    
    @objc 
    open override func supportedEvents() -> [String] {
        return [
            RemitlyCeEvents.TransferSubmitted.rawValue,
            RemitlyCeEvents.UserActivity.rawValue,
            RemitlyCeEvents.Error.rawValue,
        ]
    }
    
    @objc(configure:resolver:rejector:)
    public func configure(_ configurationDict: NSDictionary,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: RCTPromiseRejectBlock) -> Void {

        guard let jsonData = try? JSONSerialization.data(withJSONObject: configurationDict, options: []),
              let configuration = try? JSONDecoder().decode(RemitlyConfiguration.self, from: jsonData as Data) else {
            reject("E_INVALID_PARAMETER", nil, nil)
            return
        }
            
        if let webHost = configuration.webHost {
            RemitlyCeConfiguration.webHost = webHost
        }
        
        if let apiHost = configuration.apiHost {
            RemitlyCeConfiguration.apiHost = apiHost
        }
        
        if let appId = configuration.appId {
            RemitlyCeConfiguration.appID = appId
        }

        if let defaultSendCountry = configuration.defaultSendCountry {
            RemitlyCeConfiguration.defaultSendCountry = defaultSendCountry
        }
        
        if let defaultReceiveCountry = configuration.defaultReceiveCountry {
            RemitlyCeConfiguration.defaultReceiveCountry = defaultReceiveCountry
        }

        if let customerEmail = configuration.customerEmail {
            RemitlyCeConfiguration.customerEmail = customerEmail
        }

        if let languageCode = configuration.languageCode {
            RemitlyCeConfiguration.languageCode = languageCode
        }

        resolve(nil)
    }

    @objc(presentWithResolver:rejector:)
    public func present(_ resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: RCTPromiseRejectBlock) -> Void {

        self.presentRemitlyCompletion = resolve
        self.remitlyViewController = RemitlyCeViewController.present()
        self.remitlyViewController?.delegate = self
    }
    
    @objc(dismiss:)
    public func dismiss(logout: Bool) -> Void {
        self.remitlyViewController?.dismiss(animated: false)
        if (logout) {
            RemitlyCeViewController.logout()
        }
    }
    
    @objc 
    public func onDismissed() {
        self.presentRemitlyCompletion?(true)
        self.remitlyViewController = nil
        self.presentRemitlyCompletion = nil
    }

    @objc
    public func onUserActivity() -> Void {
        self.sendEvent(withName: RemitlyCeEvents.UserActivity.rawValue, body: nil)
    }
    
    @objc
    public func onTransferSubmitted() -> Void {
        self.sendEvent(withName: RemitlyCeEvents.TransferSubmitted.rawValue, body: nil)
    }
}
