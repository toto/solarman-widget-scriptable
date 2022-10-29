# SOLARMAN API

This is a documentation of the reverse engineered SOLARMAN API used by the [SOLARMAN Smart iOS App](https://apps.apple.com/us/app/solarman-smart/id1469487897)

## Authentication

If authentication is required for an API call you need to sent along an access token.

Tokens are sent in the `Authorization` header as `bearer <jwt access token>`. The [JWT](https://jwt.io) encoded tokens seem to contain info about the user when decoded.

### Request: Obtaining a token

Method: `POST`  
URL: `https://api4home.solarmanpv.com/oauth-s/oauth/token`  
Content-Type: `application/x-www-form-urlencoded`  
Accept: `application/json, text/plain, */*`  
Parameters (sent in body, as form-urlencoded):

- `system`: `SOLARMAN`
- `grant_type`: `password`
- `username`: Login email
- `password`: Lowercase, hex string of SHA256 the user password
- `client_id`: `test` (yes, rly!)
- `clear_text_pwd`: the user password in clear text (yes, rly!)

### Response:

```json
{
  "access_token": "<jwt access token>",
  "token_type": "bearer",
  "refresh_token": "<jwt refresh token>",
  "expires_in": 5183999,
  "scope": "all",
  "jti": "badcoffea9-2342-4c90-5523-ef081126abcd"
}
```

## Stations

## Maintain Station

### Request

Method: `POST`  
Authenticated: `yes`  
URL: `https://api4home.solarmanpv.com/maintain-s/station/<station-id>`  
Content-Type: `application/json;charset=utf-8`  
Accept: `application/json, text/plain, */*`  
Parameters:

- `<station-id>`: ID of the station

Body:

```json
{
  "station": {
    "id": 23425,
    "name": "Power plant",
    "creatorOrganizationId": 0,
    "ownerAccountId": null,
    "contactPhone": "",
    "type": "HOUSE_ROOF",
    "location": {
      "lat": 52.5,
      "lng": 13.4,
      "address": "Street 23, Berlin, Germany"
    },
    "region": {
      "nationId": 60,
      "level1": 883,
      "timezone": "Europe/Amsterdam"
    },
    "gridInterconnectionType": "EXCESS",
    "gridConnectedTime": null,
    "floorArea": null,
    "installationAzimuthAngle": null,
    "installationTiltAngle": null,
    "installedCapacity": "0.6",
    "startOperatingTime": "2022-10-16T15:16:56.000Z",
    "valid": true,
    "pictureFile": null,
    "createdBy": 2342,
    "createdDate": "2022-10-16T15:17:52.000Z",
    "lastModifiedBy": 2342,
    "lastModifiedDate": 1666879105,
    "ownerRemark": null,
    "ownerName": null,
    "ownerCompany": null,
    "stationImage": null,
    "powerType": "PV",
    "system": "SOLARMAN",
    "authOpen": true,
    "nmi": null
  },
  "finance": {
    "powerStationId": 23425,
    "currency": "EUR",
    "constructionCost": "",
    "constructionSubsidy": null,
    "constructionDate": null,
    "financingAmount": null,
    "financingProportion": null,
    "financingRepaymentMethod": null,
    "nationalSubsidy": null,
    "provincialSubsidy": null,
    "prefecturalSubsidy": null,
    "countySubsidy": null,
    "financingTerm": null,
    "financingInterestRate": null,
    "financingPeriod": null,
    "benchmarkPrice": null,
    "consumptionPrice": null,
    "desulfurizationPrice": null,
    "tariffUrl": null,
    "financing": null,
    "mergeElectricPrice": "0.2342",
    "createdBy": 2342,
    "createdDate": 1665933472,
    "lastModifiedBy": 2342,
    "lastModifiedDate": 1666879219,
    "subsidyUnitAmount": null,
    "dayRefund": null
  },
  "metering": {
    "powerStationId": 23425,
    "generationStatisticMethod": null,
    "consumptionStatisticMethod": null,
    "utilityStatisticMethod": null,
    "batteryStatisticMethod": null,
    "irradianceStatisticMethod": null,
    "theoryConsumeProportion": "10",
    "generationTotalOffset": null,
    "repeatedHint": true,
    "statisticMethodSettingStrategy": "DYNAMIC",
    "consumeProportionStatisticMethod": "COMPUTE",
    "createdBy": 2342,
    "createdDate": 1665933472,
    "lastModifiedBy": 2342,
    "lastModifiedDate": 1666866639,
    "cumulativeElectricMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "theoreticalStatisticMethod": null,
    "irradianceMethod": null,
    "electricityConsumptionMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "electricityPurchaseMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "gridInterconnectionMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "chargingElectricityMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "dischargeElectricityMethod": "TOTAL_FROM_DEVICE_UPLOAD",
    "consumeTotalOffset": null
  },
  "creatorUser": {
    "createdBy": 0,
    "createdDate": 1665928791,
    "id": 2342,
    "name": "name",
    "countryCode": "",
    "phoneNumber": null,
    "email": "email@example.com",
    "status": 2,
    "lastLoginTime": 1667055287,
    "username": null,
    "photo": null,
    "system": "SOLARMAN",
    "weChatNickname": null,
    "qqNickname": null,
    "lastLan": "en",
    "orgPhoto": null,
    "oldUserId": null,
    "openapiAppId": null,
    "lastVisitTime": 1667055456
  },
  "powerStationUserorOrg": {
    "userName": "username",
    "orgName": null,
    "organization": false,
    "nameList": null,
    "adminName": null,
    "adminPhone": null,
    "adminEmail": null,
    "userPhone": null,
    "userEmail": "email@example.com",
    "userId": null,
    "orgId": null
  },
  "totalRunningDayCount": 42
}
```

### Response

```json
{
  "id": 2342,
  "name": "Power Plant",
  "creatorOrganizationId": 0,
  "ownerAccountId": null,
  "contactPhone": "",
  "type": "HOUSE_ROOF",
  "location": {
    "lat": 52.5,
    "lng": 13.4,
    "address": "Street 23, Berlin, Germany"
  },
  "region": {
    "nationId": 60,
    "level1": 883,
    "level2": null,
    "level3": null,
    "level4": null,
    "level5": null,
    "timezone": "Europe/Amsterdam"
  },
  "gridInterconnectionType": "EXCESS",
  "gridConnectedTime": null,
  "floorArea": null,
  "installationAzimuthAngle": null,
  "installationTiltAngle": null,
  "installedCapacity": 0.42,
  "startOperatingTime": 1665933416.0,
  "valid": true,
  "pictureFile": null,
  "createdBy": 23424,
  "createdDate": 1665933472.0,
  "lastModifiedBy": 23424,
  "lastModifiedDate": 1666879105.0,
  "ownerRemark": null,
  "ownerName": null,
  "ownerCompany": null,
  "stationImage": null,
  "powerType": "PV",
  "system": "SOLARMAN",
  "authOpen": true,
  "nmi": null
}
```

## Photo Upload

### Request for upload

Authenticated: `yes`  
URL: `https://api4home.solarmanpv.com/store-s/uploadObject`  
Content-Type: `multipart/form-data`  
Accept: `application/json, text/plain, */*`  
Body:  
The image as multipart form data. PNG encoded.

### Response with URL

```json
{
  "url": "https://example.com/image.png"
}
```
