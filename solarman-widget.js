// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
const sjcl = importModule("lib/sjcl");

// Source at https://github.com/toto/solarman-widget-scriptable
// License BSD-License: See LICENSE file for details
// Use with https://scriptable.app

// -- Configuration --
const API_HOST = "globalhomeappapi.solarmanpv.com";
// Before 15.04.2023 the API endpoint was "api4home.solarmanpv.com"

const USERNAME = "email@example.com";
const PASSWORD = "yourPassword";
// -------------------

function query(params) {
  let result = [];
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];
      result.push(`${key}=${value}`);
    }
  }
  return result.join("&");
}

async function getToken(username, password) {
  const hash = sjcl.hash.sha256.hash(password);
  const hashedPassword = sjcl.codec.hex.fromBits(hash);
  console.log(`Hash PW ${hashedPassword}`);
  const params = query({
    system: "SOLARMAN",
    grant_type: "password",
    username: username,
    password: hashedPassword,
    client_id: "test",
    clear_text_pwd: password,
    identity_type: "2",
  });
  console.log(`Params: ${params}`);

  const request = new Request(
    `https://${API_HOST}/oauth-s/oauth/token?${params}`
  );
  request.method = "POST";
  console.log(`Start request ${request}`);

  request.body = params.toString();
  const data = await request.loadJSON();
  return data;
}

async function stationSearch(token, page = 1) {
  const body = {
    region: {
      nationId: null,
      level1: null,
      level2: null,
      level3: null,
      level4: null,
      level5: null,
    },
  };
  const request = new Request(
    `https://${API_HOST}/maintain-s/operating/station/search?page=${page}&size=10&order.direction=ASC&order.property=name`
  );
  request.method = "POST";
  request.body = JSON.stringify(body);
  request.headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };

  const data = await request.loadJSON();
  return data;
}

function createMediumWidget(homeData) {
  const widget = new ListWidget();
  const gradient = new LinearGradient();
  gradient.colors = [new Color("#0064A6"), new Color("#D6A94B")];
  gradient.locations = [0, 1];
  widget.backgroundGradient = gradient;

  const homeName = widget.addText(`☀️⚡️ ${homeData.name}`);
  homeName.textColor = Color.white();
  homeName.font = Font.boldSystemFont(12);

  widget.addSpacer();

  const wattText = `${homeData.currentWatts.toFixed(homeData.currentWatts > 100 ? 0 : 1) }W`
  const titleText = widget.addText(wattText);
  titleText.textColor = Color.white();
  titleText.font = Font.boldSystemFont(32);

  const totalkWh = `${homeData.generationValue.toFixed(1) }kWh today`
  const totalText = widget.addText(totalkWh);
  totalText.textColor = Color.white();
  totalText.font = Font.subheadline();
  
  widget.addSpacer();
  
  const updatedAtText = widget.addText(homeData.lastUpdatedLabel);
  updatedAtText.textColor = Color.white();
  updatedAtText.font = Font.caption2();

  return widget;
}

function createCircularLockScreenWidget(homeData) {
  const widget = new ListWidget();
  widget.addAccessoryWidgetBackground = true

  widget.addSpacer();

  const wattText = `${homeData.currentWatts.toFixed(0)}W`
  wattText.minimumScaleFactor = 0.75
  const titleText = widget.addText(wattText);
  titleText.textColor = Color.white();
  titleText.centerAlignText()
  titleText.font = Font.boldSystemFont(14);

  const totalkWh = `${homeData.generationValue.toFixed(1) }kWh`
  const totalText = widget.addText(totalkWh);
  totalText.minimumScaleFactor = 0.75
  totalText.centerAlignText()
  totalText.textColor = Color.white();
  totalText.font = Font.systemFont(12);
  
  widget.addSpacer();
  
  return widget;
}

function extractHomeData(home) {
  const lastUpdated = new Date();
  lastUpdated.setTime(home.lastUpdateTime * 1000.0);
  const formatter = new DateFormatter();
  if (new Date() - lastUpdated < 24 * 60 * 60 * 1000) {
    formatter.useShortTimeStyle();
    formatter.useNoDateStyle();
  } else {
    formatter.useNoTimeStyle();
    formatter.useShortDateStyle();
  }
  
  return {
    lastUpdated,
    lastUpdatedLabel: `Updated ${formatter.string(lastUpdated, new Date())}`,
    currentWatts: home.generationPower ?? 0,
    generationValue: home.generationValue ?? 0,
    percentOfCapacity: home.generationCapacity ?? 0,
    name: home.name,
    temperature: home.temperature,
    weather: home.weather,
  };
}

const token = await getToken(USERNAME, PASSWORD);
// console.log(`getToken Response: ${JSON.stringify(token)}`);
const searchResponse = await stationSearch(token.access_token);
// console.log(`searchResponse Response: ${JSON.stringify(searchResponse)}`);
const [firstHome] = searchResponse.data;
const homeData = extractHomeData(firstHome);
console.log(`Home Response: ${JSON.stringify(homeData)}`);

if (config.runsInAccessoryWidget) {
  if (config.widgetFamily == 'accessoryCircular') {
    let widget = createCircularLockScreenWidget(homeData);
    Script.setWidget(widget);
    Script.complete();
  }
} else if (config.runsInWidget) {
  let widget = createMediumWidget(homeData);
  Script.setWidget(widget);
  Script.complete();
} else {
  console.log("Not running in widget or home screen");
  console.log(`config = ${JSON.stringify(config)}`);
}
