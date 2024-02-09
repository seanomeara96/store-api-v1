import sgMail from "@sendgrid/mail";
import { Database } from "sqlite3";
import path from "path";

require("../../../config/config");

function recordEmailAddress(db: Database, email: string) {
  return new Promise((resolve, reject) =>
    db.run(`INSERT INTO emails(email) VALUES(?)`, [email], (err) =>
      err ? reject(err) : resolve(undefined)
    )
  );
}

function doesEmailExist(db: Database, email: string): Promise<number> {
  return new Promise(function (resolve, reject) {
    db.get(
      `SELECT count(email) as count FROM emails WHERE email = ?`,
      [email],
      function (err: any, row: { count: number }) {
        return err ? reject(err) : resolve(row.count);
      }
    );
  });
}

type RequiredFields = {
  name: string;
  email: string;
};

let data: RequiredFields[] = [
  { name: "", email: "cianmulvey@hotmail.com" },
  { name: "", email: "susanmcquaid1@gmail.com" },
  { name: "Deirdre Mason", email: "deirdre.costello@eu.jll.com" },
  { name: "", email: "kpclarke@gmail.com" },
  { name: "Ruth Egan", email: "ruthegan@live.ie" },
  { name: "", email: "whitem1607@gmail.com" },
  { name: "Kate Larkin", email: "katemlarkin@gmail.com" },
  { name: "", email: "macneillsuzanne@gmail.com" },
  { name: "Deirdre  Grant ", email: "deirdregrant@mac.com" },
  { name: "", email: "zoliborz2000@gmail.com" },
  { name: "", email: "tonymaher022@gmail.com" },
  { name: "", email: "tony.kirwan@gks.ie" },
  { name: "", email: "celbridgegas@gmail.com" },
  { name: "", email: "janemahony21@gmail.com" },
  { name: "", email: "info.tirabasso@gmail.com" },
  { name: "Conall O'Raghallaigh", email: "conall.oraghallaigh@gmail.com" },
  { name: "", email: "kpclarke@gmail.com" },
  { name: "", email: "valertom1@gmail.com" },
  { name: "", email: "elizabethcullen12164@gmail.com" },
  { name: "", email: "jackiemoloney@hotmail.com" },
  { name: "", email: "riordan.sarah@gmail.com" },
  { name: "Jennifer Prior", email: "jenniferkeyesprior@gmail.com" },
  { name: "Neil  McKenna ", email: "neil@wekick.ie" },
  { name: "Simon Cullen", email: "cullensimon@hotmail.com" },
  { name: "", email: "elaine@corcoransolicitors.com" },
  { name: "", email: "sbryson@outlook.ie" },
  { name: "", email: "colganao@tcd.ie" },
  { name: "Jamie Barry", email: "mrjamiebarry@gmail.com" },
  { name: "", email: "laura.reddy31@gmsil.com" },
  { name: "", email: "ursula.barry@ucd.ie" },
  { name: "", email: "gilroyfiona@yahoo.com" },
  { name: "", email: "thomaskeating1798@gmail.com" },
  { name: "", email: "eoinosullivan89@gmail.com" },
  { name: "", email: "unkkreddan@gmail.com" },
  { name: "", email: "oleary.aedin@gmail.com" },
  { name: "", email: "clairemckeon83@gmail.com" },
  { name: "Emma Fadden", email: "emma.fadden@gmail.com" },
  { name: "Sandra Younge", email: "sandrayounge@gmail.com" },
  { name: "", email: "ruthoneill@hotmail.com" },
  { name: "", email: "alessandro.ovonit@gmail.com" },
  { name: "Mary Ryan", email: "mroseryan16@gmail.com" },
  { name: "", email: "megokeeffe09@gmail.com" },
  { name: "", email: "amandabrien@hotmail.com" },
  { name: "", email: "aoibheanndonnelly@gmail.com" },
  { name: "", email: "sara_abbas1999@yahoo.ie" },
  { name: "", email: "ruthdoyler@gmail.com" },
  { name: "Emer Caffrey", email: "emercaffrey@hotmail.com" },
  { name: "", email: "liz.mahon@me.com" },
  { name: "", email: "marycw76@gmail.com" },
  { name: "", email: "grainnie@gmail.com" },
  { name: "", email: "morganhammersley@gmail.com" },
  { name: "", email: "dillon.dj@gmail.com" },
  { name: "", email: "niamh.sexton8@gmail.com" },
  { name: "Gillian Murphy", email: "gillmur29@yahoo.co.uk" },
  { name: "FILIPE SARMENTO", email: "filipecesarsarmento@gmail.com" },
  { name: "", email: "hello@katemoylan.com" },
  { name: "", email: "tina.murphy1000@gmail.com" },
  { name: "", email: "dbrowne@rkd.ie" },
  { name: "Mark Nolan", email: "mark@lotusmedia.ie" },
  { name: "", email: "goneill4@gmail.com" },
  { name: "", email: "Avrillester@gmail.com" },
  { name: "Knut Moe", email: "drknutmoe@gmail.com" },
  { name: "", email: "mullallyf@gmail.com" },
  { name: "", email: "jackpkelly835@gmail.com" },
  { name: "", email: "aislingmairesmith@gmail.com" },
  { name: "", email: "stjkilgallen@gmail.com" },
  { name: "", email: "odonnelleve@gmail.com" },
  { name: "", email: "reginac36@hotmail.com" },
  { name: "", email: "eoinpoconnor@icloud.com" },
  { name: "", email: "dgernon@gmail.com" },
  { name: "", email: "jan.mcloughlin@hotmail.com" },
  { name: "", email: "sburke@mjfinteriors.ie" },
  { name: "", email: "darrenmarksmith@hotmail.com" },
  { name: "", email: "joanjmht@hotmail.com" },
  { name: "", email: "sophiedillon22@gmail.com" },
  { name: "", email: "keaneaideen1@gmail.com" },
  { name: "", email: "claireoneill2308@hotmail.com" },
  { name: "", email: "nicola.vavasour@gmail.com" },
  { name: "Alina Sibley", email: "chloe@ecopipe.ie" },
  { name: "", email: "julie@xaiholdings.com" },
  { name: "", email: "jackkoers@hotmail.com" },
  { name: "", email: "naturalkitchen62@gmail.com" },
  { name: "Adrienne  Medlar", email: "Adrienne.medlar@gmail.com" },
  { name: "", email: "leahemcglynn@hotmail.com" },
  { name: "", email: "naomifinan@gmail.com" },
  { name: "Sarah Jane Tracey", email: "development@balallyfrc.ie" },
  { name: "", email: "Catherineholmes22@gmail.com" },
  { name: "", email: "samanthamcginn@yahoo.ie" },
  { name: "Michelle  Kiersey", email: "megankiersey@gmail.com" },
  { name: "Michelle  Kiersey", email: "megankiersey@gmail.com" },
  { name: "Anne Connolly", email: "anneconnolly@rocketmail.com" },
  { name: "", email: "sarah.murray.s@gmail.com" },
  { name: "", email: "carolehughes10@gmail.com" },
  { name: "", email: "lorrainebehan123@gmail.com" },
  { name: "", email: "allymcgeever@gmail.com" },
  { name: "", email: "marius.mcnicholas@pfizer.com" },
  { name: "", email: "g.cappock@gmail.com" },
  { name: "", email: "annafayne@gmail.com" },
  { name: "", email: "ekent@rcsi.ie" },
  { name: "", email: "davidphillips12@hotmail.com" },
  { name: "ORLA MURRAY", email: "orlamurray@gmail.com" },
  { name: "Mary Coffey", email: "marycoffey06@icloud.com" },
  { name: "Johnny Woods", email: "johnnywoods1045@gmail.com" },
  { name: "", email: "corinatormey1@hotmail.com" },
  { name: "", email: "sallyanne.stone@matheson.com" },
  { name: "Gabriele Lima", email: "gabsclima@gmail.com" },
  { name: "", email: "jenmonahan@gmail.com" },
  { name: "Fiona Culliton", email: "fculliton@gmail.com" },
  { name: "", email: "MICHAEL.GAFFNEY@GMAIL.COM" },
  { name: "", email: "davreynolds@hotmail.com" },
  { name: "Rozelle Owens", email: "rozelleowens@gmail.com" },
  { name: "Wayne  Mahon", email: "lisa-horan@hotmail.com" },
  { name: "Siobhan  Bastable ", email: "siobhan@prismgroup.ie" },
  { name: "", email: "liam.o.carroll@gmail.com" },
  { name: "", email: "lena@banba.ie" },
  { name: "", email: "carengeo@hotmail.com" },
  { name: "", email: "caradaly@hotmail.com" },
  { name: "", email: "joanne@osullivanbuilding.ie" },
  { name: "Edel Collis", email: "edelcollis@gmail.com" },
  { name: "", email: "owen.carroll47@gmail.com" },
  { name: "", email: "davidacornick@gmail.com" },
  { name: "", email: "cathy@pluto.ie" },
  { name: "Tracy Byrne", email: "tracybyrne21@gmail.com" },
  { name: "", email: "sarahmaguire79@gmail.com" },
  { name: "", email: "trishmagdowl@gmail.com" },
  { name: "Louise O'Keeffe", email: "louiseokeeffe8@gmail.com" },
  { name: "", email: "nathanmurray@live.ie" },
  { name: "", email: "nola.mc@gmail.com" },
  { name: "", email: "claudiaflanneryy@icloud.com" },
  { name: "", email: "deeturnerbyrne@icloud.com" },
  { name: "", email: "sbryson@outlook.ie" },
  { name: "Grainne Gunning", email: "grainne@gunning.com" },
  { name: "", email: "philip.smith@arthurcox.com" },
  { name: "Samuel Nocentini", email: "samuel@oliviasfood.com" },
  { name: "", email: "eivmurphy@gmail.com" },
  { name: "", email: "Patriciacraigireland@gmail.com" },
  { name: "Fintan  Clancy", email: "fintanclancy@email.com" },
  { name: "", email: "Janettegilligan@yahoo.co.uk" },
  { name: "", email: "gillian@fade.ie" },
  { name: "", email: "cocoon-snare.0d@icloud.com" },
  { name: "Michelle Murphy ", email: "michellemoore221@gmail.com" },
  { name: "", email: "caoimhe.134@gmail.com" },
  { name: "", email: "sorchaheaphy@gmail.com" },
  { name: "", email: "louise.flavin@hotmail.com" },
  { name: "", email: "watersnessa@gmail.com" },
  { name: "", email: "philomena.nolan@yahoo.ie" },
  { name: "Sharon Galvin-Reilly", email: "reillysharon@hotmail.com" },
  { name: "Aisling English", email: "ashenglish10@gmail.com" },
  { name: "", email: "ftffoster@gmail.com" },
  { name: "", email: "tony.kirwan@gks.ie" },
  { name: "andrew brown", email: "andrewbrown72@gmail.com" },
  { name: "", email: "mary@marycarney.net" },
  { name: "Rachel Byrne", email: "rachelbyrne5858@gmail.com" },
  { name: "Ciara Malone", email: "ciarambollard@gmail.com" },
  { name: "", email: "jeanclancy@mac.com" },
  { name: "", email: "carla.kinlan@gmail.com" },
  { name: "", email: "laurajmcmahon@hotmail.com" },
  { name: "", email: "mgoodman@mgmfs.ie" },
  { name: "", email: "gdiannemorris@gmail.com" },
  { name: "", email: "harry@harrycolley.com" },
  { name: "", email: "abigail.kenny@gmail.com" },
  { name: "Lisa McCarthy", email: "lisa.mccarthy@williamfry.com" },
  { name: "Deirdre Mackay", email: "dmackayfms@gmail.com" },
];

data = data.filter(d => d.email.includes("gmail.com"))

console.log("number of gmail addresses")

data = data.slice(50);

console.log("data length", data.length)


function properCase(inputString: string) {
  return inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
}

async function sendGoogleReviewRequest() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const db = new Database(path.resolve(__dirname, "./emails.db"));

  for (let { name, email } of data) {
    name = name.trim();
    name = name.split(" ")[0]
    name = properCase(name)
    
    if (name === "") {
      name = "there";
    }
    email = email.toLowerCase();

    const emailExists = await doesEmailExist(db, email);
    if (emailExists) {
      console.log("email exists");
      continue;
    }

    let msg = {
      to: email,
      from: "gavin@caterhire.ie",
      subject: /*HTML*/ `Hi ${name}! How Did CaterHire.ie Do?`,
      html: /*HTML*/ `<p>Hi ${name}</p>
            <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CeLvcGIx3fvgEB0/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
            <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
            <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
            <p>Thanks again for shopping at CaterHire.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
            <p>Best Regards,</p>
            <p>Gavin Divilly</p>
            <p>Managing Director</p>`,
    };

    try {
      await sgMail.send(msg);
      await recordEmailAddress(db, email);
      console.log(`google review request email sent to ${name} => ${email}`);
    } catch (err: any) {
      console.log(err.response ? err.response.body : err);
      throw err;
    }
  }
}

sendGoogleReviewRequest();
