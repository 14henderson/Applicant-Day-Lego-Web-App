var budget = 0;
var currentYear = 1;
var end = false;

var availableCards = {
    0:["Threat Assessment", 20000],
    1:["Asset Audit", 30000],
    2:["Antivirus", 30000],
    3:["Security Training", 30000],
    4:["CCTV (plant)", 50000],
    5:["CCTV (office)", 50000],
    6:["Network Monitoring (plant)", 50000],
    7:["Network Monitoring (office)", 50000],
    8:["Firewall (office)", 30000],
    9:["Firewall (plant)", 30000]
};
var lockedCards = {
    10:["Controller Upgrade", 30000],
    11:["Server Upgrade", 30000],
    12:["PC Upgrade", 30000],
    13:["Database Encryption", 20000],
    14:["PC Encryption", 20000]
};
var ownedCards = {};
var purchesThisRound = {};


function buildVariables(){
    document.getElementById("budget").innerHTML = budget;
    document.getElementById("current-year").innerHTML = currentYear;
}

function buildAvailable(){
    document.getElementById("available-cards").innerHTML = "";
    if(availableCards.length == 0){
        document.getElementById("available-cards").innerHTML = "<i>No cards left to buy!</i>";
    }else{
        Object.entries(availableCards).forEach(([ID, card]) => {
            document.getElementById("available-cards").innerHTML += "<li id='card-list'>" + card[0] + " - £" + card[1]+"<button onClick='buyCard("+ID+")'>Buy</button></li>";
        });
    }
}

function closeWindows(){
    document.getElementById("asset-audit-container").style.display = "none";
    document.getElementById("threat-assessment-container").style.display = "none";
    document.getElementById("grey-opaque").style.display = "none";
}

function assetAudit(){
    document.getElementById("grey-opaque").style.display = "block";
    document.getElementById("asset-audit-container").style.display = "block";
    availableCards = Object.assign({}, availableCards, lockedCards);
    buildVariables();
    buildPurchased();
    buildAvailable();
}
function threatAssessment(){
    document.getElementById("grey-opaque").style.display = "block";
    document.getElementById("threat-assessment-container").style.display = "block";
    buildVariables();
    buildPurchased();
    buildAvailable();
}


function buildPurchased(){
    document.getElementById("purchased-cards").innerHTML = "";
    if(ownedCards.length == 0){
        document.getElementById("purchased-cards").innerHTML = "<i>No cards bought!</i>";
    }else{
        Object.entries(Object.assign({}, purchesThisRound, ownedCards)).forEach(([ID, card]) => {
            document.getElementById("purchased-cards").innerHTML += "<li id='card-list'>" + card[0] + " - £" + card[1]+"</li>";
        });
    }
}


function endGame(){
    document.getElementById("grey-opaque").style.display = "block";
    document.getElementById("congratulations-container").style.display = "block";

    if(end || budget < 0){
        document.getElementById("final-status").innerHTML = "Bankrupt and finished. You'll never work in a senior role again.";
    }else{
        document.getElementById("final-status").innerHTML = "Alive and with a final budget of £"+budget;
    }
    
}

function buyCard(ID){
    if(budget < availableCards[ID][1]){
        alert("Not enough in your budget!");
    }else{
        budget -= availableCards[ID][1];
        purchesThisRound[ID] = availableCards[ID];
        delete availableCards[ID];

        buildVariables();
        buildPurchased();
        buildAvailable();
        if(ID == 1){
            assetAudit();
        }else if(ID == 0){
            threatAssessment();
        }
    }
}


function startGame(){
    document.getElementById("home").style.display = "none";
    budget = 100000
    document.getElementById("game").style.display = "block";

    buildVariables();
    buildAvailable();
    buildPurchased();
}

function initiateNextYear(){
    document.getElementById("yearly-update").style.display = "none";
    if(currentYear == 4 || end == true){
        endGame();
    }else{
        document.getElementById("year-intro").style.display = "block";
        currentYear += 1;
        document.getElementById("year-header-intro").innerHTML = "Year "+currentYear;
    }
}

function nextYear(){
    document.getElementById("year-intro").style.display = "none";
    document.getElementById("grey-opaque").style.display = "none";
    
    budget += 100000;

    buildVariables();
    buildAvailable();
    buildPurchased();
}


function completeYear(){
    document.getElementById("grey-opaque").style.display = "block";
    document.getElementById("yearly-update").style.display = "block";
    //Good
    goodMessage = "";
    badMessage = "";
    document.getElementById("good-news").innerHTML = "";
    document.getElementById("bad-news").innerHTML = "";
    document.getElementById("currentYearCongrats").innerHTML = currentYear;
    if(currentYear == 1){
        if(3 in purchesThisRound) goodMessage += "<p> You organise a FALCON training/awareness day, which gives you and your staff advice on all things cyber.  You cover things like strong passwords, phishing, not clicking on links and lots of other practical advice.  As a result your staff are much more efficient at protecting your company.  Good job!  A word of warning though!  Your staff are still human and as such, will still make the occasional mistake. </p>";
        if(2 in purchesThisRound) goodMessage += "<p> It's a good job that you've got one of the basic forms of protection in early.  Although you don't realise it, your Anti-Virus stops a ransomware from infecting your systems. You've just saved a lot of work and money.</p>";
        if(9 in purchesThisRound) goodMessage += "<p> The plant firewall intercepts a number of scanning attempts from all over the world.  Apparently, there are people out there very interested in knowing more about your plant.</p>";
        if(8 in purchesThisRound) goodMessage += "<p> A sudden surge of traffic is detected as a number of machines from all around the world are trying to flood your office network with requests.  Fortunately, your network administrator can quickly update the filtering rules of the office firewall and the attack does not cause much disruption </p>";
    }else if(currentYear == 2){
        if(3 in purchesThisRound) goodMessage += "<p> You organise a FALCON training/awareness day, which gives you and your staff advice on all things cyber.  You cover things like strong passwords, phishing, not clicking on links and lots of other practical advice.  As a result your staff are much more efficient at protecting your company............Good job!......................A word of warning though!  Your staff are still human and as such, will still make the occasional mistake...............................................................................................................................Due to your training/awareness event a staff member identifies a phishing email and realises that the personal information about them is actually all easily available via a basic google search.  This ensures that they don't click on the attached malicious link.  You've just avoided downloading Ransomware that would've cost you £20,000 to unlock your computers and get your data back. </p>";
        if(2 in purchesThisRound) goodMessage += "<p> After a lot of negative publicity from when you were the victim of a ransomware, your new anti-virus has been working extra hard.  You seem to have become a target for a lot of attacks.  Your decision to install an anti-virus was clearly a wise choice.</p>";
        if(4 in purchesThisRound) goodMessage += "<p> It's lucky that you've got defence in depth.  Your security guard hands you a report that says he stopped someone trying to break into the plant overnight.  This person also had a key logger on him.  It turns out that he had links to an Organised Criminal Gang.............Who knows what could've happened!</p>";
        if(9 in purchesThisRound) goodMessage += "<p> The plant firewall intercepts a number of scanning attempts from all over the world.  Apparently, there are people out there very interested in knowing more about your plant.</p>";
        if(8 in purchesThisRound) goodMessage += "<p> A sudden surge of traffic is detected as a number of machines from all around the world are trying to flood your office network with requests.  Fortunately, your network administrator can quickly update the filtering rules of the office firewall and the attack does not cause much disruption.  You've just prevented the script kiddie from taking your biggest contract of the year!</p>";
    }else if(currentYear == 3){
        if(3 in purchesThisRound) goodMessage += "<p> You organise a FALCON training/awareness day, which gives you and your staff advice on all things cyber.  You cover things like strong passwords, phishing, not clicking on links and lots of other practical advice.  As a result your staff are much more efficient at protecting your company.  Good job!........................................A word of warning though!  Your staff are still human and as such, will still make the occasional mistake..................................................One day the finance department gets an urgent email from someone purporting to be the CEO.  He wants £75,000 transferred into a new business account ASAP.  He sends instructions not to contact him, as he's having a very important meeting at the golf course.  However, your staff member remembers the training that they received, so they call the CEO to check.  Well done, you've just saved £75,000.......................It's a good job that you've installed a positive behaviour change within your company.</p>";
        if(2 in purchesThisRound) goodMessage += "<p> After a lot of negative publicity from the last 2 years of Ransomware attacks, your new anti-virus has been working extra hard.  You seem to have become a target for a lot of attacks.  Your decision to install an anti-virus was clearly a wise choice.  If only you had done this earlier! </p>";
        if(9 in purchesThisRound) goodMessage += "<p> The plant firewall intercepts a number of scanning attempts from all over the world.  Apparently, there are people out there very interested in knowing more about your plant.  You don't realise it but you're decision to finally instal a firewall has just saved your company.</p>";
        if(8 in purchesThisRound) goodMessage += "<p> A sudden surge of traffic is detected as a number of machines from all around the world are trying to flood your office network with requests.  Fortunately, your network administrator can quickly update the filtering rules of the office firewall and the attack does not cause much disruption.  It would've been disastrous had you not have had a firewall in place.</p>";
        if(13 in purchesThisRound) goodMessage += "<p> You discover that someone has managed to gain access to your databases.  They have stolen customer's personal data.  You correctly record the breach in your data breach log.  Fortunately, all your data was encrypted, so the breach doesn't pose a high risk of adversely affecting individuals’ rights and freedoms.  This means that you don't have to inform the ICO or the data subjects. You've just prevented massive reputational damage to your company.</p>";
        if(10 in purchesThisRound) goodMessage += "<p> With SCADA controllers being so expensive AND vital to your company, it was clearly a good decision to upgrade.  If you had ignored these vulnerabilities, it could've been very costly!</p>";
        if(11 in purchesThisRound) goodMessage += "<p> Unbeknown to you, a group known to protest for green power have attacked your server.  Apparently, they believe that your turbines create a lot of pollution.  Thanks to your upgraded server, they were unable to deface your website as planned.  They give up trying to get through your strong security and decide to attack an easier target, which turns out to be your main competitor!  What a good result!</p>";
    }else if(currentYear == 4){
        if(3 in purchesThisRound) goodMessage += "<p> You organise a FALCON training/awareness day, which gives you and your staff advice on all things cyber.  You cover things like strong passwords, phishing, not clicking on links and lots of other practical advice.  As a result your staff are much more efficient at protecting your company.  Good job!.......................A word of warning though!  Your staff are still human and as such, will still make the occasional mistake.......................................................................... You're never made aware of the fact that an Organised Criminal Gang have been targeting you, trying to crack your staff password's.  Luckily they all have strong passwords made of 3 random words........just like how they were told at their training day.   Business continues as usual but it could've been so much different.</p>";
        if(4 in purchesThisRound) goodMessage += "<p> You receive a report from your plant security guard.  Overnight, they stopped someone trying to retrieve a key logger from the SCADA controller.  It turns out that it was placed there the last time your plant was physically attacked.  The damage and graffiti was just a diversion for something far more sinister.  The data that was on the key logger would've been enough to close you down for good.....Phew!</p>";
        if(7 in purchesThisRound) goodMessage += "<p> Having been fired from your company, an ex-employee has accessed your system remotely.  They intend to wipe everything from your systems and bring your company crashing down around you.  Fortunately, your network monitor identified this unusual activity and you prevented this from happening.  You identify how they gained access and close the weakness.  Nothing of any value is lost.</p>";
        if(13 in purchesThisRound) goodMessage += "<p> You discover that someone has managed to gain access to your databases.  They have stolen customer's personal data.  You correctly record the breach in your data breach log.  Fortunately, all your data was encrypted, so the breach doesn't pose a high risk of adversely affecting individuals’ rights and freedoms.  This means that you don't have to inform the ICO or the data subjects. You've just prevented massive reputational damage to your company.</p>";
        if(10 in purchesThisRound) goodMessage += "<p> With SCADA controllers being so expensive AND vital to your company, it was clearly a good decision to upgrade.  This decision prevents a rogue member of staff from creating a zero-day virus, which would've locked your turbines, costing you £200,000. The board would not have been too pleased!</p>";
        if(11 in purchesThisRound) goodMessage += "<p> As the server is the usual way that hackers will target your system, it's a good job that you've finally upgraded them.  The consequences of not doing this could've been disastrous.  Let's just say that you've probably done better than a team that didn't do this!</p>";
    }

    if(goodMessage == "") document.getElementById("good-news-header").innerHTML = "";
    document.getElementById("good-news").innerHTML = goodMessage;

    //Bad
    end = false;
    if(currentYear == 1){
        if(2 in availableCards){
            budget -= 5000;
            badMessage += "<p> A ransomware has somehow made it's way onto your networks.  All computers at your plant and office have been locked with ransomware.  You decide to pay the ransom, a total of £5,000.  Luckily, this unlocks all the computers and you get all your data back.</p>";
        } 
        if(9 in availableCards){
            budget -= 20000;
            badMessage += "<p> An Information Security student decided to practice by hacking into your company.  They couldn't believe how easy it was and that a company like yours didn't have basic cyber security at your plant!  As they're a future white hat, they decide to report you to the news instead of stealing from you.  The news story loses you £20,000 in sales over the year. The ICO (Information Comissioners Office) also conduct an investigation and decide not to fine you but remind you of your responsabilities about the security of personal data under the EU General Data Protection Regulation (GDPR)</p>";
        }
        if(8 in availableCards){
            budget -= 15000;
            badMessage += "<p> A bored script kiddie decided to practice hacking by trying to hack into your company.  They were thrilled when they realised that you didn't have an office firewall!  Unfortunately, they're a future black hat and decide to intercept payment request emails to your providers using a Remote Access Trojan.  They end up committing a mandate fraud of £15,000. They prevent you from seeing this by launching a DDOS attack as a smokescreen.  Without a firewall in place, there is nothing you can do about it. </p>";
        }
    } else if(currentYear == 2){
        if(3 in availableCards){
            budget -= 20000;
            badMessage += "<p> One day a staff member received a spear phishing email, containing information about the university they went to.  Not knowing about social engineering or being aware of their data footprint, allows them to click on the attached link, which tells them that there is a problem with their account and requests their login details to rectify it. The staff member provides these, which allows the hackers to access your systems remotely.  They cancel contracts, which lead to a loss of £20,000. </p>";
        } 
        if(1 in availableCards){
            budget -= 17500;
            badMessage += "<p> Somehow, some of your sensitive files have ended up for sale on the dark web.  The resulting ICO investigation establishes that access was gained via your servers. They decide to fine you £17,500 due to breaching principle 6 of the EU General Data Protection Regulation.</p>";
        }
        if(2 in availableCards){
            budget -= 40000;
            badMessage += "<p> With word spreading on the dark web that you were the victim of a ransomware virus, you are again victim to ransomware.  A 13 year old decides to test his skills and successfully launches an attack on your systems.  Although the suspect is arrested and found guilty, the negative news story knocks 50% of your company's share price.  This also loses you £40,000 in yearly revenue.</p>";
        } 
        if(4 in availableCards){
            budget -= 15000;
            badMessage += "<p> After running a minimum staffing level across the bank holiday, a break in is found at the Plant. It seems like nothing has been taken but graffiti has been sprayed everywhere and all the computers have been damaged.  Luckily it appears as if the Scada controller wasn't targeted.  It costs you £15,000 for a thorough clean and to replace all the damage.  Everything has been replaced to the same specifications as before.  I wonder how they got away with it?</p>";
        } 
        if(9 in availableCards){
            budget -= 175000;
            badMessage += "<p> The white hat Information Security student is bored one day and decides to see if you now have basic cyber security at your plant.  They're astounded to see that you still don't have a firewall. They report you directly to the ICO. The ICO inform you that they consider your previous breach as an aggravating factor.  They decide to issue you a fine of £175,000.  They warn you that any further breaches, which are a risk to the rights and freedoms of data subjects will not be tolerated.</p>";
        } 
        if(8 in availableCards){
            budget -= 150000;
            badMessage += "<p> The same script kiddie can't believe their luck.  They're still able to hack into your system.  This time they wait for a big contract before committing mandate fraud.  Unfortunately for you, it was one of your biggest contracts of the year for £150,000. </p>";
        }


    } else if(currentYear == 3){
        if(3 in availableCards){
            budget -= 75000;
            badMessage += "<p> One day the finance department gets an urgent email from someone purporting to be the CEO.  He wants £75,000 transferred into a new business account ASAP.  He sends instructions not to contact him, as he is having a very important meeting at the golf course.  Not knowing what to do, the finance department pay it.  It turns out that this was a CEO fraud and you'll never see the money again.  If only your staff had known what to look out for.</p>";
        }
        if(13 in availableCards){
            budget -= 70000;
            badMessage += "<p> Throughout the year, your main competitor has been winning every contract that they've bided for by undercutting you by minimal amounts.  It's as if they know what some of your sensitive data says! You have lost £70,000 in sales over the year.</p>";
        } 
        if(10 in availableCards){
            budget -= 60000;
            badMessage += "<p> Over the last year your turbines have been behaving eratically, almost as if somebody is in control.  The resulting loss of revenue causes a sales loss of £60,000 </p>";
        }
        if(11 in availableCards){
            budget -= 65000;
            badMessage += "<p> A group known to protest for green power have attacked your server.  Apparently, they believe that your turbines create a lot of pollution.  They have defaced your website by posting some very unpleasant things.  The resulting loss of reputation and sales amounts to £65,000 </p>";
        }

        if(8 in availableCards){
            badMessage = "<p> You have successfully made someone a millionaire.  Mr script kiddie has been living off your terrible decision making for the last year.  He has managed to commit mandate fraud on multiple different contracts this year, totalling millions of pounds.  Unsurprisingly, you cant afford to lose this kind of business and your company goes bankrupt.  Your professional reputation is in tatters.</p>";
            end = true;
        }
        if(9 in availableCards){
            badMessage = "<p> Overnight, your Scada controller makes your turbines spin faster and faster until eventually they explode, killing people close by.  Not only does your business close for good, you are held responsible and are found guilty of corporate manslaughter.  It was discovered during the investigation that you had failed to install a plant firewall for 3 years, despite numerous previous warnings.</p>";
            end = true;
        }
        if(2 in availableCards){
            badMessage = "<p> Your well known lack of security has made you a target for people to test their skills on you.  Your systems are attacked almost daily.  With your complete lack of Anti-virus being well known on the dark web.  Your computers and Scada controller are locked daily.  Your business can't continue and you are forced to shut down for good.</p>";
            end = true;
        }

    } else if(currentYear == 4){
        if(3 in availableCards){
            badMessage = "<p> Due to a severe lack of training, the majority of staff still have their introductory password of 'password'.  Someone has been able to access all sensitive files by cracking these passwords.  You discover that all you accounts have been emptied and contracts cancelled.  Your business is no more.  Frankly it's a wonder how it survived this long.</p>";
            end = true;
        }
        if(1 in availableCards){
            badMessage = "<p> After spending the last 3 years randomly guessing what security you've needed, you finally realise that you should have assessed your vulnerabilities at least once!  Unfortunately, this epiphany comes far too late.  Due to multiple weaknesses being exploited, all your data has been extracted, your computers locked and your Scada controller jammed, causing your turbines to permanently stop.  You've not only let your company and all your staff down, you've let yourself down </p>";
            end = true;
        }
        if(4 in availableCards){
            badMessage = "<p> It has now been discovered that the first time you had a break in, the graffiti was a smoke screen for something more sinister.  A key logger had been placed on your Scada controller.  As you haven't invested in physical security, the criminals were able to recover this key logger undetected.  They've used the details to remote access the controller and cause the turbines to spin uncontrollably until they explode, seriously injuring workers at the plant.  Your business collapses, leaving your professional reputation in tatters.</p>";        
            end = true;
        }
        if(13 in availableCards){
            badMessage = "<p> A staff member decided that he can make more money by stealing from you, than working for you.  One day, they install a pen drive in one of your databases, stealing all of your unencrypted data.  This makes headline news and the resulting reputational damage is catastrophic.  To add salt to the wound, the ICO fine you 2 million euros for a breaching principle 6 of the GDPR.  With annual losses like this, your company goes bust. </p>";
            end = true;
        }
        if(11 in availableCards){
            badMessage = "<p> Due to the weaknesses in your server, someone is able to remotely log in.  They steal all your files, including details on contracts and human resources.  You fail to notify the data subjects without undue delay and the regulators within the 72 hour time limit.  The resulting investigation uncovers that you had previously had weaknesses identified with you server, which you failed to act on it.  The ICO decide to make an example of you and fine you 5 million euros.  This fine, in combination with the lost contract files and negative publicity causes you to permanently shut down.  It's unlikely you'll ever work in a senior role again. </p>";
            end = true;
        }

        if(7 in availableCards){
            badMessage += "<p> Having been fired from your company, an ex-employee has accessed your system remotely.  They wipe as much data as they can, trying to bring your company crashing down around you.  Fortunately, they're only partly successful.  They wipe significant amounts of data but miss the chance to wipe out business critical data.  This results in a combination of business and operational losses of £40,000. </p>";
            end = true;
        }
        if(12 in availableCards){
            badMessage += "<p> An employee who has a particular dislike for the management has used one of the known vulnerabilites in your PC's operating system to elevate their access priviliges.  They get access to the management's email systems and send out abusive emails to all of your customers.  This costs you £50,000 in sales.</p>";
            end = true;
        }
        if(10 in availableCards){
            badMessage += "<p> Half way through the year, the turbines stop completely.  It is discovered that someone used a known vulnerability to create a zero day virus which locked your turbines.  You pay the ransom that was demanded but nothing happens, so you are forced to replace the software.  The combined loss of the ransom, sales and the new software equates to £200,000.  If only you had patched when you had the chance.</p>";
            end = true;
        }
    }

    ownedCards = Object.assign({}, ownedCards, purchesThisRound);
    purchesThisRound = {};
    if(badMessage == "") document.getElementById("bad-news-header").innerHTML = "";
    document.getElementById("bad-news").innerHTML = badMessage;
}


