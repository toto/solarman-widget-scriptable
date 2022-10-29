# solarman-widget-scriptable

Widget for the Solarman API using scriptable.app. The API has been reverse engineered from the [SOLARMAN iOS app](https://apps.apple.com/us/app/solarman-smart/id1469487897).

## Dependencies

To employ SHA256 the app uses the [sjcl](https://github.com/bitwiseshiftleft/sjcl) library. 

## Usage

1. Fill in `USERNAME` and `PASSWORD` on top of the `solarman-widget.js` file with your login data.
2. Copy `solarman-widget.js` and `lib/sjcl.js` into your Scriptable directory (see [scriptable.app](https://scriptable.app) for more infos).
3. Add a small widget to your home screen and choose solarman-widget in the widget config.
