const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;




const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());

var randomUseragent = require('random-useragent');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/bank', (req, res) => {
    bank_info(req, res);
  })
  .get('/thai', (req, res) => {
    thai_info(req, res);
  })
  .get('/facebook', (req, res) => {
    facebook_info(req, res);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  function facebook_info(req, res) {
    facebook(req, res).then();
  }
  

function bank_info(req, res) {
  run(req, res).then();
}

function thai_info(req, res) {
  thai_stock(req, res).then();
}

async function run(req, res) {

  try {

    const blockedResourceTypes = [
      'image',
      'media',
      'font',
      'texttrack',
      'object',
      'beacon',
      'csp_report',
      'imageset',
    ];

    const skippedResources = [
      'quantserve',
      'adzerk',
      'doubleclick',
      'adition',
      'exelator',
      'sharethrough',
      'cdn.api.twitter',
      'google-analytics',
      'googletagmanager',
      'google',
      'fontawesome',
      'facebook',
      'analytics',
      'optimizely',
      'clicktale',
      'mixpanel',
      'zedo',
      'clicksor',
      'tiqcdn',
    ];


    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });


    const page = await browser.newPage();

    await page.setViewport({
      width: 600,
      height: 800
    });
    await page.setUserAgent(randomUseragent.getRandom())
    await page.goto('https://ablmm.com/online');
    var d = new Date();
    var n = d.getTime();
    n += ".png";
    const USERNAME_SELECTOR = '#username';
    const PASSWORD_SELECTOR = '#password';
    const BUTTON_SELECTOR = 'body > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td:nth-child(2) > input[type=submit]';

    const USERNAME = req.query.username; //"aungkoman"; //var id = req.query.username;
    const PASSWORD = req.query.password; // "@ungkom@n5";


    // success on 2019-10-04
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(USERNAME);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(PASSWORD);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    //await page.screenshot({ path: 'screenshots/loginError.png' });

    const CURRENT_SELECTOR = '#w > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)';
    const SAVING_SELECTOR = '#w > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(2)';


    let current = await page.evaluate((sel) => {
      return document.querySelector(sel).innerHTML;
    }, CURRENT_SELECTOR);

    


    let saving = await page.evaluate((sel) => {
      return document.querySelector(sel).innerHTML;
    }, SAVING_SELECTOR);


    current = current.replace(',', '').trim();
    saving = saving.replace(',', '').trim();


    let current_num = parseInt(current);
    let saving_num = parseInt(saving);
    let sum_num = current_num + saving_num;
    //res.send("bank_info "+current+ " and "+saving + " = " +sum_num );
    res.send("" + sum_num);
    browser.close();

  } catch (e) {
    console.error(e); // 30

    res.send("0");
  }
}


async function thai_stock(req, res) {
  try {
    const blockedResourceTypes = [
      'image',
      'media',
      'font',
      'texttrack',
      'object',
      'beacon',
      'csp_report',
      'imageset',
    ];

    const skippedResources = [
      'quantserve',
      'adzerk',
      'doubleclick',
      'adition',
      'exelator',
      'sharethrough',
      'cdn.api.twitter',
      'google-analytics',
      'googletagmanager',
      'google',
      'fontawesome',
      'facebook',
      'analytics',
      'optimizely',
      'clicktale',
      'mixpanel',
      'zedo',
      'clicksor',
      'tiqcdn',
    ];
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1024,
      height: 800
    });
    await page.setUserAgent(randomUseragent.getRandom())
    await page.goto('https://www.set.or.th/set/mainpage.do?language=th&country=TH');
    var d = new Date();
    var n = d.getTime();
    n += ".png";
    const SET_TEST = '#nav-set > div.col-xs-12.col-md-6.col-sm-6.first-child > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)';
    const SET_SELECTOR = '#nav-set > div.col-xs-12.col-md-6.col-sm-6.first-child > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)';
    const GET_SELECTOR = '#nav-set > div.col-xs-12.col-md-6.col-sm-6.first-child > div:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(4)';

    let set_text = await page.evaluate((sel) => {
      return document.querySelector(sel).innerText;
    }, SET_SELECTOR);


    let get_text = await page.evaluate((sel) => {
      return document.querySelector(sel).innerHTML;
    }, GET_SELECTOR);

    var set_count = set_text.length - 1;
    var set_number = set_text[set_count];

    var get_count = get_text.length - 4;
    var get_number = get_text[get_count];

    var lottery_number = set_number + "" + get_number;

    // " real number is "+get_number+":"+set_number
    //res.send(set_text+" and "+get_text+"length is set get "+set_text.length+" , "+get_text.length+ " real number is "+set_number+":"+ get_number);
    res.send(lottery_number);
    browser.close();

  } catch (e) {
    console.error(e); // 30

    res.send("0");
  }
}



async function facebook(req, res) {

  try {

    const blockedResourceTypes = [
      'image',
      'media',
      'font',
      'texttrack',
      'object',
      'beacon',
      'csp_report',
      'imageset',
    ];

    const skippedResources = [
      'quantserve',
      'adzerk',
      'doubleclick',
      'adition',
      'exelator',
      'sharethrough',
      'cdn.api.twitter',
      'google-analytics',
      'googletagmanager',
      'google',
      'fontawesome',
      'facebook',
      'analytics',
      'optimizely',
      'clicktale',
      'mixpanel',
      'zedo',
      'clicksor',
      'tiqcdn',
    ];


    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    
    await page.setViewport({
      width: 1024,
      height: 800
    });
    
    //await page.setUserAgent(randomUseragent.getRandom())
    await page.goto('https://facebook.com', {waitUntil: 'load', timeout: 0});
    var d = new Date();
    var n = d.getTime();
    n += ".png";
    
    
    const USERNAME_SELECTOR = '#email';
   const USERNAME = "hdhgfh@gmail.com";

    const PASSWORD_SELECTOR = '#pass';
   const PASSWORD = "mnmbm"
    const BUTTON_SELECTOR = '#u_0_b';


    // success on 2019-10-04
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(USERNAME);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(PASSWORD);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();
   //  https://www.facebook.com/aung.k.man.353
    // bhonemyathein26893
    await page.goto('https://www.facebook.com/aung.x.zaw.9', {waitUntil: 'load', timeout: 0});

    // await page.waitForNavigation();
    await page.screenshot({ path: 'screenshots/loginError.png' });

    // const CURRENT_SELECTOR = '#w > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)';
    // const SAVING_SELECTOR = '#w > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(2)';


    // let current = await page.evaluate((sel) => {
    //   return document.querySelector(sel).innerHTML;
    // }, CURRENT_SELECTOR);

    


    // let saving = await page.evaluate((sel) => {
    //   return document.querySelector(sel).innerHTML;
    // }, SAVING_SELECTOR);


    // current = current.replace(',', '').trim();
    // saving = saving.replace(',', '').trim();


    // let current_num = parseInt(current);
    // let saving_num = parseInt(saving);
    // let sum_num = current_num + saving_num;
    // //res.send("bank_info "+current+ " and "+saving + " = " +sum_num );
    res.send("Completed");
    browser.close();

  } catch (e) {
    console.error(e); // 30

    res.send("0");
  }
}