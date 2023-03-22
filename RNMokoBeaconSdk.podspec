
Pod::Spec.new do |s|
  s.name         = "RNMokoBeaconSdk"
  s.version      = "1.0.0"
  s.summary      = "RNMokoBeaconSdk"
  s.description  = <<-DESC
                  RNMokoBeaconSdk
                   DESC
  s.homepage     = "https://github.com/flyinggekkogit/RNMokoBeaconSdk#readme"
  s.license      = "MIT"
  s.author             = { "Sergey Zorko" => "sergeyzorko@gmail.com" }
  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/flyinggekkogit/RNMokoBeaconSdk.git", :tag => "master" }
  
  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "MKBeaconSDK"

end

  