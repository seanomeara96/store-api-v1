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
      (err: any, row: { count: number }) =>
        err ? reject(err) : resolve(row.count)
    );
  });
}

type RequiredFields = {
  name: string;
  email: string;
};

let data: RequiredFields[] = [
  { name: "Elizabeth Ann Howard", email: "annhoward77@gmail.com" },
  { name: "", email: "annilaram@gmail.com" },
  { name: "", email: "rachfitz92@gmail.com" },
  { name: "", email: "helenburnsflynn@gmail.com" },
  { name: "", email: "katie.obrien0851@gmail.com" },
  { name: "", email: "liam.m.jacobs@gmail.com" },
  { name: "", email: "kpclarke@gmail.com" },
  { name: "Nessa Dwyer", email: "nessadwyer@gmail.com" },
  { name: "", email: "quentin.doranoreilly@gmail.com" },
  { name: "", email: "cliona.hurson@gmail.com" },
  { name: "Colin Corcoran", email: "colincorcoran55@gmail.com" },
  { name: "", email: "archbold.tom@gmail.com" },
  { name: "", email: "pattarikafleming@gmail.com" },
  { name: "", email: "anewspaceforever@gmail.com" },
  { name: "", email: "Oreillytomo0112@gmail.com" },
  { name: "", email: "shackgrogan@gmail.com" },
  { name: "", email: "aidan.desmond01@gmail.com" },
  { name: "Anne Hanney ", email: "ahanney1@gmail.com" },
  { name: "Anna Hurley", email: "hurleyanna1@gmail.com" },
  { name: "Annemarie Murphy", email: "annemariemurphy.70@gmail.com" },
  { name: "", email: "djkarlkel@gmail.com" },
  { name: "", email: "emmagfagan@gmail.com" },
  { name: "", email: "keaneaoife@gmail.com" },
  { name: "", email: "quentin.doranoreilly@gmail.com" },
  { name: "", email: "larkideb@gmail.com" },
  { name: "", email: "bourkemarie@gmail.com" },
  { name: "", email: "Smggreen23@gmail.com" },
  { name: "", email: "joannie.langbroek@gmail.com" },
  { name: "", email: "dearbhailg@gmail.com" },
  { name: "Lisa Cunningham", email: "lisacunningham1234@gmail.com" },
  { name: "", email: "donalburke1975@gmail.com" },
  { name: "", email: "ajhopkins45@gmail.com" },
  { name: "", email: "tinavaughan6@gmail.com" },
  { name: "", email: "climurdub@gmail.com" },
  { name: "", email: "rosie.lindsay@gmail.com" },
  { name: "", email: "samukta.patro@gmail.com" },
  { name: "", email: "tobin.lynda@gmail.com" },
  { name: "", email: "alisonhaughton52@gmail.com" },
  { name: "", email: "donnatodhunter@gmail.com" },
  { name: "", email: "sinead40.lewis@gmail.com" },
  { name: "", email: "brendan.bfs@gmail.com" },
  { name: "", email: "fionaoconnor58@gmail.com" },
  { name: "Grainne Wright", email: "grainnewright@gmail.com" },
  { name: "", email: "amariakeegan@gmail.com" },
  { name: "", email: "eleanorcoleman247@gmail.com" },
  { name: "Maud Grandemange", email: "maudgrandemange1@gmail.com" },
  { name: "", email: "fresheyesdev@gmail.com" },
  { name: "", email: "sheenacarton@gmail.com" },
  { name: "", email: "nat.murray.g@gmail.com" },
  { name: "tony walsh", email: "tony.walsh5@gmail.com" },
  { name: "", email: "liz.mcgingl@gmail.com" },
  { name: "", email: "stephanie.danckert@gmail.com" },
  { name: "", email: "grainneswan@gmail.com" },
  { name: "", email: "fitzgerald.laurie@gmail.com" },
  { name: "", email: "aislinggillespie@gmail.com" },
  { name: "", email: "katie.obrien0851@gmail.com" },
  { name: "", email: "siobhanmburke@gmail.com" },
  { name: "", email: "katyagreene@gmail.com" },
  { name: "", email: "fleurmc@gmail.com" },
  { name: "", email: "abrcounselling@gmail.com" },
  { name: "Toni Owens", email: "toniowens2000@gmail.com" },
  { name: "", email: "cracatinni2@gmail.com" },
  { name: "", email: "rmagnier@gmail.com" },
  { name: "Kevin Manning", email: "saltiusmaximus@gmail.com" },
  { name: "", email: "andrew.mulvenny@gmail.com" },
  { name: "", email: "declan.rudden@gmail.com" },
  { name: "", email: "mooneyadam6@gmail.com" },
  { name: "", email: "thalita.recife@gmail.com" },
  { name: "", email: "simonobrien99@gmail.com" },
  { name: "Dave Hackett", email: "davehac@gmail.com" },
  { name: "", email: "samantha.dockrell@gmail.com" },
  { name: "", email: "alison.caffrey14@gmail.com" },
  { name: "", email: "padraicjckinsella@gmail.com" },
  { name: "", email: "sorchafarrell@gmail.com" },
  { name: "", email: "mitchell.andrea@gmail.com" },
  { name: "", email: "peterpigotbridge@gmail.com" },
  { name: "", email: "orlaith.odea@gmail.com" },
  { name: "", email: "sweetsandsprinkles2016@gmail.com" },
  { name: "Peter Geraghty", email: "peter.geraghty.is@gmail.com" },
  { name: "", email: "kerri.judge@gmail.com" },
  { name: "", email: "cruceliss@gmail.com" },
  { name: "Rebecca Buckley", email: "gagebyr@gmail.com" },
  { name: "", email: "ahanney1@gmail.com" },
  { name: "", email: "amigo.shubham@gmail.com" },
  { name: "", email: "donna.naughton@gmail.com" },
  { name: "", email: "dwyerjulieann@gmail.com" },
  { name: "Brendan OBrien", email: "brendan.ce.obrien@gmail.com" },
  { name: "", email: "vickijsutherland@gmail.com" },
  { name: "", email: "hickeyelle@gmail.com" },
  { name: "Anna Munnelly", email: "rausingltd@gmail.com" },
  { name: "", email: "psmith7812@gmail.com" },
  { name: "Deborah Horan", email: "dhoran08@gmail.com" },
  { name: "", email: "davejackie.reid@gmail.com" },
  { name: "", email: "drmaryaiken@gmail.com" },
  { name: "", email: "zenadawson10@gmail.com" },
  { name: "Daniel Ralston", email: "danielralston1977@gmail.com" },
  { name: "", email: "audrey.dvrx@gmail.com" },
  { name: "Niamh Fortune", email: "fortuneniamh@gmail.com" },
  { name: "", email: "hynesliza@gmail.com" },
  { name: "Anne Hanney ", email: "ahanney1@gmail.com" },
  { name: "", email: "unajmoore@gmail.com" },
  { name: "", email: "ajmckeon2@gmail.com" },
  { name: "", email: "okeeffe.valerie@gmail.com" },
  { name: "", email: "helenpriceharp@gmail.com" },
  { name: "Peter Geraghty", email: "peter.geraghty.is@gmail.com" },
  { name: "Tharaka Prabhashwara", email: "tharakapr89@gmail.com" },
  { name: "", email: "seandavidmccormack@gmail.com" },
  { name: "", email: "sarahmurphypr@gmail.com" },
  { name: "", email: "whitedarina@gmail.com" },
  { name: "Leanne Milligan", email: "leanneattley@gmail.com" },
  { name: "", email: "yvonne.dduffy@gmail.com" },
  { name: "Tara  Murphy ", email: "taramurphy1@gmail.com" },
  { name: "justin coogan", email: "tobin.lynda@gmail.com" },
  { name: "", email: "waterhousedeirdre@gmail.com" },
  { name: "", email: "zoesheehan@gmail.com" },
  { name: "", email: "leirbagsellav@gmail.com" },
  { name: "", email: "evagaynor@gmail.com" },
  { name: "", email: "zoesheehan@gmail.com" },
  { name: "", email: "ciaran.dunne.dunne@gmail.com" },
  { name: "", email: "sinead40.lewis@gmail.com" },
  { name: "Helen  Kilmartin ", email: "helendublin@gmail.com" },
  { name: "Gillian Mullan", email: "gillianmullan@gmail.com" },
  { name: "Aidan Desmond", email: "aidan.desmond01@gmail.com" },
  { name: "Nessa Dwyer", email: "nessadwyer@gmail.com" },
  { name: "", email: "oreillytomo0112@gmail.com" },
  { name: "Emma Fagan", email: "emmagfagan@gmail.com" },
  { name: "Killian O'Brien", email: "kilobrien@gmail.com" },
  { name: "", email: "robupton90@gmail.com" },
  { name: "Quentin Doran O'Reilly", email: "quentin.doranoreilly@gmail.com" },
  { name: "", email: "johnnyburns1@gmail.com" },
  { name: "", email: "donalburke1975@gmail.com" },
  { name: "", email: "thebunker.ie@gmail.com" },
  { name: "", email: "aislinggillespie@gmail.com" },
  { name: "", email: "redniamho@gmail.com" },
  { name: "Pat Kitterick", email: "patkitterick@gmail.com" },
  { name: "", email: "natashamurray05@gmail.com" },
  { name: "", email: "maisling@gmail.com" },
  { name: "Suzanne OHara", email: "ohara.suzanne@gmail.com" },
  { name: "Scott White", email: "Scott.white1602@gmail.com" },
  { name: "Gail Gibson", email: "gailgibson.gg@gmail.com" },
  { name: "", email: "gusjones.dublin@gmail.com" },
  { name: "", email: "Niamhmarshall1254@gmail.com" },
  { name: "", email: "claire.browne43@gmail.com" },
  { name: "", email: "pielows@gmail.com" },
  { name: "", email: "drjoanmoroney@gmail.com" },
  { name: "", email: "stephanie.danckert@gmail.com" },
  { name: "Jeremy Smyth", email: "jeremysmyth78@gmail.com" },
  { name: "Sharon Nolan", email: "snolan013@gmail.com" },
  { name: "", email: "niamhmarshall1254@gmail.com" },
  { name: "Bar Clara  Mendez McConnon ", email: "bar.clara.mendez@gmail.com" },
  { name: "", email: "neiljcorcoran@gmail.com" },
  { name: "", email: "1990chiarasulis@gmail.com" },
];

data = data.filter((d) => d.email.includes("gmail.com"));

// from 25 -> end
data = data.slice(25);

console.log("data length", data.length);

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
    name = name.split(" ")[0];
    name = properCase(name);

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
      from: "leona@hireall.ie",
      subject: /*HTML*/ `Hi ${name}! How Did HireAll.ie Do?`,
      html: /*HTML*/ `<p>Hi ${name}</p>
            <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CShEfnD--rquEB0/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
            <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
            <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
            <p>Thanks again for shopping at HireAll.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
            <p>Best Regards,</p>
            <p>Leona Rothwell</p>
            <p>Commercial Director</p>`,
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
