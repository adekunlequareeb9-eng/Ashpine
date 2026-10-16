import type { InspectCopy, JournalEntry, Save, Script, TalkNode } from "@/game/types";

function node(speaker: string, text: string, extra: Partial<TalkNode> = {}): TalkNode {
  return { speaker, text, ...extra };
}

export const JOURNAL: Record<string, JournalEntry> = {
  seal: {
    id: "seal",
    title: "The seal",
    text: "He put it in your hand at dusk and told you not to expect him at the usual hour. The papers were already in your name. He had packed nothing you could see.",
  },
  holding: {
    id: "holding",
    title: "P. Meridian holding",
    text: "A quarterly transfer in Shen's hand, marked personal, stopped the month he left. It is not a supplier Iris recognises. She has not written to the bank.",
  },
  study: {
    id: "study",
    title: "The lamp is still on",
    text: "The study is locked. Through the glass: a green lamp, a cleared desk, a cream page torn down one side. The watermark is a pine needle, not the ash-leaf stamp on the shop stationery.",
  },
  board: {
    id: "board",
    title: "Winter exhibition",
    text: "City Martial Circuit, open class, empty hands, three weeks to enter. Ashpine is not on the list. Ren wants the proof. Hana thinks he is early, not wrong.",
  },
  adler: {
    id: "adler",
    title: "Adler & Co.",
    text: "14 Quay Stairs. She said a private clientele will come whether or not you feel ready, and that the question 'where did he go' has already been wasted.",
  },
  paper: {
    id: "paper",
    title: "Same paper",
    text: "Adler's card and the torn page in the study share a watermark and the same cream stock. She did not mention the study. The study cannot mention her.",
  },
};

export function inspectFor(id: string, save: Save): InspectCopy {
  if (id === "study") {
    const extra = save.flags.adler
      ? " You take out Adler's card. Same cream stock. Same pine needle."
      : "";
    return {
      title: "The study window",
      body:
        "The door is locked and the lamp is not. Green light on a desk cleared except for a closed ledger and a cream page torn down one side. The watermark is a pine needle. Your shop stationery uses an ash leaf. Nobody is in the chair." +
        extra,
    };
  }
  return {
    title: "City Martial Circuit",
    body: "Winter Exhibition — open class. Public rules. Empty hands. Applications close in three weeks. Ashpine Hall is not yet listed. Someone has pencilled, in the margin of the posted sheet, 'serious houses only'.",
  };
}

function met(id: string, save: Save) {
  return save.met.includes(id);
}

export function scriptFor(id: string, save: Save): Script {
  if (save.era === "flashback") return flash(id);
  switch (id) {
    case "lin":
      return met("lin", save) ? linAgain(save) : linFirst();
    case "ren":
      return met("ren", save) ? renAgain(save) : renFirst();
    case "sable":
      return met("sable", save) ? sableAgain(save) : sableFirst();
    case "jonah":
      return met("jonah", save) ? jonahAgain(save) : jonahFirst();
    case "hana":
      return met("hana", save) ? hanaAgain(save) : hanaFirst();
    case "tomas":
      return met("tomas", save) ? tomasAgain(save) : tomasFirst();
    case "iris":
      return met("iris", save) ? irisAgain(save) : irisFirst();
    case "adler":
      return save.flags.dawn && save.posture === "stairs" && !save.flags.branch ? adlerQuay(save) : adler();
    case "council":
      return council(save);
    case "evening":
      return evening(save);
    case "hale":
      return hale();
    case "letter":
      return letter();
    case "exhibit":
      return exhibit(save);
    case "door":
      return door(save);
    case "pia":
      return one("pia", "Pia", "Hana said to keep my elbow in. I am keeping my elbow in. If you are the owner, please don't add a second instruction until this one fits.");
    default:
      return one("ellis", "Ellis", "Dawn class already finished. I stayed because the dummy doesn't sigh when I miss. Ren says that's not a personality. I think it's a kindness.");
  }
}

function one(id: string, speaker: string, text: string): Script {
  return {
    id,
    start: "a",
    nodes: { a: node(speaker, text, { effect: `met:${id}`, close: "talk" }) },
  };
}

function flash(id: string): Script {
  if (id === "shen") {
    return {
      id: "shen",
      start: "s1",
      nodes: {
        s1: node(
          "Shen Wei",
          "You came straight from the floor. Good. The others are here because this concerns all five of you, but the papers are in your name. That was my decision, not a vote.",
          { next: "s2" },
        ),
        s2: node(
          "Shen Wei",
          "Ashpine is a trading house that teaches martial arts, not a school that sells tea to seem respectable. Both halves are real. Both have people who depend on them. Neglect either, and the other starts to lie.",
          { next: "s3" },
        ),
        s3: node(
          "Shen Wei",
          "I am leaving the seal, the accounts, and a set of notes. The notes will look like breathing exercises. Practise before you decide they are only that.",
          {
            choices: [
              { label: "Where are you going?", goto: "s4a" },
              { label: "Why me? Lin is better with the books.", goto: "s4b" },
              { label: "We'll keep it standing.", goto: "s4c" },
            ],
          },
        ),
        s4a: node(
          "Shen Wei",
          "If I answer that today, you will hear a destination instead of a warning. Stay with the house. It will teach you which questions are worth the walk.",
          { next: "s5" },
        ),
        s4b: node(
          "Shen Wei",
          "She is. She will also tell you when you are wrong, which is why you can carry the name. Leadership is not the same gift as being correct.",
          { next: "s5" },
        ),
        s4c: node(
          "Shen Wei",
          "Do not promise the building. Promise the people who open it. Buildings are patient. People are not.",
          { next: "s5" },
        ),
        s5: node(
          "Shen Wei",
          "The seal is yours. I have already signed the rest. Do not look for me at the usual hour tomorrow. I dislike long goodbyes, and I have already had this one.",
          { effect: "seal", close: "handover" },
        ),
      },
    };
  }
  const lines: Record<string, [string, string]> = {
    lin: ["Lin Mei", "If you're about to refuse him, don't. We already talked. He's made up his mind, and so have we."],
    ren: ["Ren Calder", "I'll keep the hall honest. You keep the rest of us from inventing five different plans."],
    sable: ["Sable Quinn", "He packed nothing. I looked. Draw whatever conclusion you like, but don't tell me it's an ordinary trip."],
    jonah: ["Jonah Vale", "We'll be all right, Captain. That's not optimism. That's the work."],
  };
  const pair = lines[id] ?? ["Someone", "He's waiting."];
  return {
    id,
    start: "a",
    nodes: { a: node(pair[0], pair[1], { effect: `met:flash:${id}`, close: "talk" }) },
  };
}

function linFirst(): Script {
  return {
    id: "lin",
    start: "a",
    nodes: {
      a: node(
        "Lin Mei",
        "You're on the floor before eight. I'll allow myself to be impressed for one breath. Gao sent the autumn price. It's up. Iris has the page ready, and she has used the red pen, which means she is being polite.",
        { next: "b" },
      ),
      b: node(
        "Lin Mei",
        "We've made payroll for six months. Nobody is celebrating, which is how I know it's real. The house is not dying. It is one careless contract away from becoming a story we tell badly.",
        {
          choices: [
            { label: "What do you want me to do about Gao?", goto: "c" },
            { label: "How are you, aside from the invoice?", goto: "d", effect: "bond:lin:+1:You asked about her, not only the invoice." },
          ],
        },
      ),
      c: node(
        "Lin Mei",
        "I want the regulars to taste the same cup in November that they tasted in May. That means Gao. Whether you pay his pride or let Jonah talk him down is your name on the paper. I'll live with either if you do it on purpose.",
        { effect: "met:lin", close: "talk" },
      ),
      d: node(
        "Lin Mei",
        "Tired. Useful. I keep thinking about a version of this house that people mention without saying his name after. I don't know if that is ambition or ingratitude. I'm not asking you to solve it in the corridor.",
        { effect: "met:lin", close: "talk" },
      ),
    },
  };
}

function linAgain(save: Save): Script {
  const night = save.flags.evening ? "The books are closed. I'm still here because the red pen makes a sound I can think in. " : "";
  const line = night + (
    save.decision === "pay"
      ? "You paid him. The shelf stays honest. I won't pretend the margin is comfortable, but I can defend this number with my head up."
      : save.decision === "exclusive"
        ? "Jonah's exclusive. It holds if Gao's harvest holds. We've tied the season to one man's weather. I hope you did that because you trust the relationship, not because the signature was cheaper."
        : save.decision === "dock"
          ? "Dock stock. Tomas will sell it because Tomas is loyal, and two Wednesday regulars will know. I hope the cash was worth the conversation I'm about to have."
          : "The ledger is on the desk. Gao will not become more patient if we stare at the kettle."
  );
  return {
    id: "lin",
    start: "a",
    nodes: {
      a: node("Lin Mei", line, {
        choices: [
          { label: "Open the ledger.", effect: "ledger" },
          { label: "The four of us still aren't on the payroll.", goto: "b" },
        ],
      }),
      b: node(
        "Lin Mei",
        "Jonah calls it loyalty. I call it a habit that will turn into resentment the first time one of us needs a dentist. Not this morning. But write it down somewhere you can't romanticise it.",
        { close: "talk" },
      ),
    },
  };
}

function renFirst(): Script {
  return {
    id: "ren",
    start: "a",
    nodes: {
      a: node(
        "Ren Calder",
        "Hana took dawn class. She corrected a student three times and didn't mention us once. That's peace. Don't waste it by only owning the floor.",
        { next: "b" },
      ),
      b: node(
        "Ren Calder",
        "The winter exhibition is on the board by the gate. Public rules. Open class. I want our name on the list — not for a trophy. For proof the hall still produces fighters, and not only memories of him.",
        {
          choices: [
            { label: "Then spar. Show me the gap.", effect: "spar" },
            { label: "Are we good enough?", goto: "c" },
            { label: "After the morning's other work.", effect: "met:ren" },
          ],
        },
      ),
      c: node(
        "Ren Calder",
        "Hana is Martial 6 and pretends the number is impolite. You're Martial 2. I'm 3. 'Good enough' is a spectator's phrase. Come and find out where you actually fail.",
        {
          choices: [
            { label: "Spar.", effect: "spar" },
            { label: "Not this minute.", effect: "met:ren" },
          ],
        },
      ),
    },
  };
}

function renAgain(save: Save): Script {
  const night = save.flags.evening ? "Students are gone. The floor is not. " : "";
  const line = night + (
    save.sparResult === "win"
      ? "You found the opening. Don't get poetic about it. Do it again when you're tired, or it was a story."
      : save.sparResult === "loss"
        ? "You lost a spar in your own hall and you're still standing here. That's the useful part. The other part is that I told you the rhythm and your body was late."
        : save.sparResult === "draw"
          ? "Neither of us yielded. Hana would call that unfinished. I call it a reason to go again."
          : "The floor is free. Talking about the exhibition will not put our name on it."
  );
  return {
    id: "ren",
    start: "a",
    nodes: {
      a: node("Ren Calder", line, {
        choices: [
          { label: "Spar again.", effect: "spar" },
          { label: "Leave the floor to the students." },
        ],
      }),
    },
  };
}

function sableFirst(): Script {
  return {
    id: "sable",
    start: "a",
    nodes: {
      a: node(
        "Sable Quinn",
        "The study is locked. The key is not in the lower desk, the till, or the place Jonah hides sweets. I looked. I am telling you that I looked.",
        { next: "b" },
      ),
      b: node(
        "Sable Quinn",
        "His breathing notes are missing a page. The tear is yellowed — older than our signatures on the deliveries. And the lamp in there is on. It has been on for six months. Iris also found a transfer, 'P. Meridian holding', that stopped the month he left.",
        {
          choices: [
            { label: "Don't break into the study.", goto: "c", effect: "bond:sable:+0:You drew a line. She heard care, and also a closed door." },
            { label: "Keep looking. Bring it to me before you do anything sharp.", goto: "d", effect: "bond:sable:+1:You gave her a method, and a person to bring it to." },
            { label: "P. Meridian. Any honest guess?", goto: "e" },
          ],
        },
      ),
      c: node(
        "Sable Quinn",
        "I wasn't going to use a brick. I'm saying the lock is part of the message. He locked it knowing we would stand on this side of the glass.",
        { effect: "met:sable", close: "talk" },
      ),
      d: node(
        "Sable Quinn",
        "I will. I don't want a secret from you. I want a method. If the lamp is a timer, it's a very confident timer.",
        { effect: "met:sable", close: "talk" },
      ),
      e: node(
        "Sable Quinn",
        "Holding companies don't get nicknames in his handwriting unless they were people, or places he didn't want the staff to repeat. P is not a supplier. I checked the invoices twice and then felt unwell about how much I enjoyed checking.",
        { effect: "met:sable", close: "talk" },
      ),
    },
  };
}

function sableAgain(save: Save): Script {
  if (save.flags.dawn && save.posture === "stairs" && !save.flags.branch) {
    return {
      id: "sable",
      start: "a",
      nodes: {
        a: node(
          "Sable Quinn",
          "She's at the number. I'm not going in without you, and I'm not walking home on the question we already agreed was wasted. Pine paper. Who still has the plate. That's the visit.",
          { close: "talk" },
        ),
      },
    };
  }
  const line = save.flags.evening
    ? "I'm not going back to the glass tonight. If I do, I'll start inventing a reason to force the lock, and you already told me what kind of morning that would be."
    : save.flags.study
    ? save.flags.adler
      ? "You saw the page. You've held her card. I won't say the word coincidence where the paper matches. I also won't kick the door. Yet."
      : "You looked. Good. The tear wasn't theatre. If a stranger mentions pine needles, I want the sentence before you give them tea."
    : "The window is right there. I'm not asking you to become me. I'm asking you to use your eyes before the morning fills up with invoices.";
  return {
    id: "sable",
    start: "a",
    nodes: { a: node("Sable Quinn", line, { close: "talk" }) },
  };
}

function jonahFirst(): Script {
  return {
    id: "jonah",
    start: "a",
    nodes: {
      a: node(
        "Jonah Vale",
        "Mrs Pell asked if you were eating. I lied with confidence. There's rice in the kitchen if you want the lie to become administration.",
        { next: "b" },
      ),
      b: node(
        "Jonah Vale",
        "The others will bring you problems shaped like their talents. Lin, numbers. Ren, a fight. Sable, a locked door. I'm bringing you the fact that the students stayed. Twenty-two of them. They like Hana. They are still deciding whether they like us.",
        {
          choices: [
            { label: "We keep the house by keeping the people.", goto: "c", effect: "bond:jonah:+1:You said the people first, where he could hear it." },
            { label: "Tell me about Gao, honestly.", goto: "d" },
          ],
        },
      ),
      c: node(
        "Jonah Vale",
        "Then say it where they can hear you, not only to me. I'll hold you to it, Captain. Affectionately. Which is the dangerous kind.",
        { effect: "met:jonah", close: "talk" },
      ),
      d: node(
        "Jonah Vale",
        "He's proud and he's fair. Haggle like he's a stranger and he'll sell the root to Pell and smile while he does it. Ask him for the season, exclusive, and mean it — he'll grumble and stay. I can walk that conversation. Not as a trick. As a history.",
        { effect: "met:jonah", close: "talk" },
      ),
    },
  };
}

function jonahAgain(save: Save): Script {
  if (save.flags.dawn && save.posture === "receive" && !save.flags.branch) {
    return {
      id: "jonah",
      start: "a",
      nodes: {
        a: node(
          "Jonah Vale",
          "Hale is in the office. I'll stay. You do the talking. If he spends the hour on where Shen went, we don't pay him with a story. Tea is already poured. Don't apologise for the cups.",
          { close: "talk" },
        ),
      },
    };
  }
  const night = save.flags.evening ? "Mrs Pell would say eat. The rice is still there. " : "";
  const line = night + (
    save.decision === "exclusive"
      ? "Gao will grumble in writing and then send the usual crates. You let the relationship do the work. I'll go see him this afternoon so the paper has a face."
      : save.decision === "pay"
        ? "You paid. Clean. I would have talked, but paying isn't an insult. Just don't forget the rice, or Mrs Pell will audit me."
        : save.decision === "dock"
          ? "You went around him. The dock blend will sell for a week and then the regulars will start a rumour that tastes like the tea. I wish you'd let me walk over there."
          : "If you want Gao handled like a person, say so before Lin handles him like a column. Both are kinds of respect. They are not the same kind."
  );
  return {
    id: "jonah",
    start: "a",
    nodes: { a: node("Jonah Vale", line, { close: "talk" }) },
  };
}

function hanaFirst(): Script {
  return {
    id: "hana",
    start: "a",
    nodes: {
      a: node(
        "Hana Okabe",
        "You may watch the class. You may not apologise for owning the floor. The students can smell uncertainty, and they already have enough of their own.",
        { next: "b" },
      ),
      b: node(
        "Hana Okabe",
        "Ren wants the exhibition. He is not wrong. He is early. The difference is smaller than he thinks, and larger than a poster.",
        {
          choices: [
            { label: "What was Master Shen like, at the end?", goto: "c" },
            { label: "Will you keep teaching?", goto: "d" },
          ],
        },
      ),
      c: node(
        "Hana Okabe",
        "Quiet. He stopped correcting the advanced students and started watching the doorway. I asked if he was ill. He said he was finishing a count. I dislike answers like that. They tend to be precise.",
        { effect: "met:hana", close: "talk" },
      ),
      d: node(
        "Hana Okabe",
        "I teach because the hall is serious. Keep it serious and I stay. Turn it into a story about five young owners and I will say so — and then I will stay long enough to see whether you listened.",
        { effect: "met:hana", close: "talk" },
      ),
    },
  };
}

function hanaAgain(save: Save): Script {
  return {
    id: "hana",
    start: "a",
    nodes: {
      a: node(
        "Hana Okabe",
        save.flags.second
          ? "The door has a name. You do not get to knock on it by repeating the sentence. Practise, or go look after the house. Both are the work."
          : save.flags.evening
          ? "The hall is locked. If you practise, practise quietly. The dark is not an audience."
          : "Your breath notes are not a costume. If you practise them on this floor, do it until the strike belongs to you. I will not clap for a performance of his handwriting.",
        { close: "talk" },
      ),
    },
  };
}

function tomasFirst(): Script {
  return {
    id: "tomas",
    start: "a",
    nodes: {
      a: node(
        "Tomas Reid",
        "Gao's root is what this counter smells like. The dock blend is cheaper and it tastes like a rumour of tea. I'll wrap whichever you buy. I only have one mouth, so I'm using it now.",
        { next: "b" },
      ),
      b: node(
        "Tomas Reid",
        "Shen used to stand where you're standing and say nothing for a full minute. Customers thought it was wisdom. I think he was listening for a loose lid. You don't have to imitate the silence. You do have to notice the lid.",
        { effect: "met:tomas", close: "talk" },
      ),
    },
  };
}

function tomasAgain(save: Save): Script {
  const line =
    save.decision === "dock"
      ? "I'll label it honestly. If a regular asks, I won't lie for the margin. That's the only condition I didn't put in writing, because I assumed it was obvious."
      : "The lids are tight. The morning is ordinary. Ordinary is what most of our people pay us for.";
  return { id: "tomas", start: "a", nodes: { a: node("Tomas Reid", line, { close: "talk" }) } };
}

function irisFirst(): Script {
  return {
    id: "iris",
    start: "a",
    nodes: {
      a: node(
        "Iris Chen",
        "The week balances if we treat Gao's old price as still true. It does not balance if we pretend the new letter is a suggestion. I have flagged the line. Politely. The pen was already red.",
        { next: "b" },
      ),
      b: node(
        "Iris Chen",
        "There is also a dead transfer. Quarterly, to an account he labelled P. Meridian holding, marked personal, ceased six months ago. I don't chase a man's private money without the owner asking. You are the owner.",
        {
          choices: [
            { label: "Leave it noted. We'll come back with a better question.", goto: "c", effect: "holding" },
            { label: "Open the ledger. I'll settle the supply.", effect: "ledger" },
          ],
        },
      ),
      c: node(
        "Iris Chen",
        "Noted. I prefer an owner who can say 'not yet' to one who invents an answer to look decisive. The red line will still be there after lunch.",
        { effect: "met:iris", close: "talk" },
      ),
    },
  };
}

function irisAgain(save: Save): Script {
  const line = save.decision
    ? "I'll enter the supply the way you chose it, not the way a neater week would have preferred. That's the job."
    : "The book is open whenever you are. Gao's letter does not improve with age.";
  return { id: "iris", start: "a", nodes: { a: node("Iris Chen", line, { close: "talk" }) } };
}

function adler(): Script {
  return {
    id: "adler",
    start: "a",
    nodes: {
      a: node(
        "Ms Adler",
        "Ashpine opens at seven. That was part of the understanding, though none of you signed it. I'm not collecting a debt. I wanted to see whether the door still meant what it meant.",
        {
          choices: [
            { label: "What understanding?", goto: "b" },
            { label: "If you have business, you have it with me.", goto: "c" },
            { label: "Master Shen isn't here.", goto: "d" },
          ],
        },
      ),
      b: node(
        "Ms Adler",
        "A private clientele. People who do not put their names on a circuit poster. They will come whether or not you feel ready. How you receive them will matter more than how hard any of you can hit.",
        { next: "e" },
      ),
      c: node(
        "Ms Adler",
        "Good. Then I'll say it to you. Shen Wei kept company that does not introduce itself at a counter. You will know them by the questions, not the clothes. I am only the first question.",
        { next: "e" },
      ),
      d: node(
        "Ms Adler",
        "I'm aware. The ward is full of people who are aware and still telling the wrong story. I won't trade rumours before breakfast. If he had wanted you to have a sentence, he would have left one you could frame.",
        { next: "e" },
      ),
      e: node(
        "Ms Adler",
        "My card. Fourteen Quay Stairs. When you have a better question than where he went, the address will still be good. Don't come with the first question. It's already been wasted by calmer people than either of us.",
        { effect: "adler", close: "talk" },
      ),
    },
  };
}

function council(save: Save): Script {
  const lin =
    save.decision === "pay"
      ? "The supply is paid. I can live with a thin week. I cannot live with a clientele that doesn't appear in the book."
      : save.decision === "exclusive"
        ? "Jonah's exclusive is written down. A private clientele is not the same kind of promise, and I won't pretend it is."
        : "The dock blend is in the book. If we now start taking nameless visitors, the regulars will think we have two faces. They will be right.";
  const ren =
    save.sparResult === "win"
      ? "You found the opening this morning. That doesn't mean the next person through the gate is a spar."
      : "Whoever she represents, they are not a poster on the circuit board. Don't treat a card like a challenge slip.";
  const sable = save.flags.study
    ? "Her card and the torn page in the study are the same paper. I am saying that once, and then I am going to stand here and not kick the door."
    : "I haven't seen her paper next to the page in the study, because someone still hasn't looked through the glass. I'm saying that without throwing anything.";
  return {
    id: "council",
    start: "a",
    nodes: {
      a: node(
        "Jonah Vale",
        "She left a card and a tone of voice. Lin has the supply written down. Ren has an opinion about the floor. Sable has not kicked the study door, which I am calling growth. We're here because the morning got larger than a kettle.",
        { next: "b" },
      ),
      b: node("Lin Mei", lin, { next: "c" }),
      c: node("Ren Calder", ren, { next: "d" }),
      d: node("Sable Quinn", sable, {
        choices: [
          {
            label: "We receive them. One at a time. Never alone.",
            goto: "receive",
            effect: "posture:receive",
          },
          {
            label: "We don't open the door to people we can't name.",
            goto: "refuse",
            effect: "posture:refuse",
          },
          {
            label: "Quay Stairs. Sable comes. We take a better question.",
            goto: "stairs",
            effect: "posture:stairs",
          },
        ],
      }),
      receive: node(
        "Jonah Vale",
        "Then I'll be the second person in the room. Not as a bodyguard. As someone who notices when a guest stops being a guest.",
        { next: "end" },
      ),
      refuse: node(
        "Ren Calder",
        "Good. A hall that opens for anyone with a quiet card stops being a hall. The address can sit in the journal until it earns a better question.",
        { next: "end" },
      ),
      stairs: node(
        "Sable Quinn",
        "I'll come. I won't pretend I'm only there to take notes. If the paper matches, I want to see who still has the plate.",
        { next: "end" },
      ),
      end: node(
        "Lin Mei",
        "Then that's the house, for tonight. Go close the hall before Hana does it and decides we needed reminding.",
        { effect: "council", close: "talk" },
      ),
    },
  };
}

function evening(save: Save): Script {
  const rank =
    save.martialLevel >= 3
      ? "You moved today. Don't spend the dark congratulating a number. Martial 3 is a floor that still has to be stood on."
      : "You are still Martial 2. That is not a verdict. It is also not a coat you get to wear without the work.";
  return {
    id: "evening",
    start: "a",
    nodes: {
      a: node(
        "Hana Okabe",
        `The students are gone. The floor is still warm. Whatever you decided in the courtyard, the hall does not need to hear it tonight. ${rank}`,
        { next: "b" },
      ),
      b: node(
        "Hana Okabe",
        "Lock the side door. I'll take the front. If you look back at the residence, the study lamp will still be on. Leave it. A light is not an invitation, and a lock is not an answer.",
        {
          choices: [
            { label: "Lock the side door.", goto: "c" },
            { label: "Will you still be here at dawn?", goto: "d" },
          ],
        },
      ),
      d: node(
        "Hana Okabe",
        "I'll be here if the hall is still serious. You have not made it less serious today. That is the compliment. Don't make me repeat it.",
        { next: "c" },
      ),
      c: node(
        "Hana Okabe",
        "Good. Go. The five of you kept the doors open for six months. One evening of closing them will not undo that.",
        { close: "epilogue" },
      ),
    },
  };
}

function hale(): Script {
  return {
    id: "hale",
    start: "a",
    nodes: {
      a: node(
        "Jonah Vale",
        "This is Mr Hale. He asked for the owner, and he asked that I stay. I stayed. The kettle has already done its job.",
        { next: "b" },
      ),
      b: node(
        "Mr Hale",
        "Adler said this house would receive one person, and never alone. I am the one person. I did not come to ask where Shen Wei went. That question has been spent by people with more patience than I have.",
        {
          choices: [
            { label: "Then what is the hour for?", goto: "c" },
            { label: "Forty minutes. Then the door.", goto: "d" },
          ],
        },
      ),
      c: node(
        "Mr Hale",
        "A private hour on the floor, and a look at whether your paper is still an ash leaf. I can pay for the hour. I cannot pay you to become a different house, and I will not ask to see the study.",
        { next: "e" },
      ),
      d: node(
        "Mr Hale",
        "Then we understand each other. I will not stretch the time, and I will not decorate it. The floor, the paper on the desk, and then I go.",
        { next: "e" },
      ),
      e: node(
        "Mr Hale",
        "Four hundred and eighty pounds for the hour. Your friend stays. If the answer is not today, I will not pretend to be offended. A rule that bends for the first quiet coat is not a rule.",
        {
          choices: [
            { label: "Take the hour. Jonah stays.", goto: "stay" },
            { label: "The hour can wait. The rule stands.", goto: "wait" },
          ],
        },
      ),
      stay: node(
        "Jonah Vale",
        "I'll clear the office. He didn't ask the wasted question. That's the part I'm going to remember, not the fee.",
        { effect: "branch:hale", close: "talk" },
      ),
      wait: node(
        "Mr Hale",
        "Then I'll tell Adler the door is a door. She will not be surprised. Neither, I think, will you.",
        { effect: "branch:hale-wait", close: "talk" },
      ),
    },
  };
}

function letter(): Script {
  return {
    id: "letter",
    start: "a",
    nodes: {
      a: node(
        "The letter",
        "No stamp. Cream paper, a pine needle in the watermark. The hand is Adler's, or a very confident imitation. 'You closed the door. I will not send people to test the lock. The address remains. The first question is still wasted.'",
        {
          choices: [
            { label: "File it. The refusal holds.", effect: "branch:letter" },
            { label: "Keep it. Do not answer it.", effect: "branch:letter" },
          ],
        },
      ),
    },
  };
}

function exhibit(save: Save): Script {
  const ren =
    save.sparResult === "win"
      ? "You already proved something on the floor. A list is a different kind of proof. I still want our name where serious houses put theirs."
      : "I don't want a trophy. I want the hall on a public list, so we are not only a story people tell about an old man who left.";
  return {
    id: "exhibit",
    start: "a",
    nodes: {
      a: node(
        "The notice",
        `Winter Exhibition. Open class. Empty hands. Applications close in three weeks. The margin still says 'serious houses only'. The fee, if you enter this morning, is six hundred pounds. ${ren}`,
        {
          choices: [
            { label: "Enter Ashpine. Pay the fee.", effect: "exhibit:enter" },
            { label: "Hold. He is early, not wrong.", effect: "exhibit:hold" },
          ],
        },
      ),
    },
  };
}

function adlerQuay(save: Save): Script {
  const study = save.flags.study
    ? "You have seen the page in the study. I am not going to pretend that is a coincidence, and I am not going to explain the lock."
    : "If you have not looked through your own study glass, do that before you decide my stationery is a plot.";
  return {
    id: "adler",
    start: "a",
    nodes: {
      a: node(
        "Sable Quinn",
        "We're here. I'm not taking notes for the performance of it. If the paper matches, I want to know who else still has the plate.",
        { next: "b" },
      ),
      b: node(
        "Ms Adler",
        `You came without the wasted question. That is why the door upstairs is open and we are standing in the wet instead. ${study}`,
        {
          choices: [
            { label: "Who else uses the pine needle?", goto: "c" },
            { label: "What do those rooms call the ninth?", goto: "d" },
          ],
        },
      ),
      c: node(
        "Ms Adler",
        "People who do not put their names on a circuit poster. I will not give you a list before lunch, and I will not give you one at all if you treat it as a hunt. The plate is older than my card. Your ash leaf is the public face. The pine is what he used when he was not speaking to customers.",
        { next: "e" },
      ),
      d: node(
        "Ms Adler",
        "In rooms that do not print notices, Martial 9 is not a prize. It is a door. I have not walked through it. I have not met anyone who would admit they had, not to me, and not to you. The city has no public name past nine. Anyone who offers you one this year is selling you a story.",
        { next: "e" },
      ),
      e: node(
        "Ms Adler",
        "Take that back to the hall. Do not bring me a framed sentence about Shen Wei. If he had wanted you to have one, you would already be tired of it.",
        { effect: "branch:quay", close: "talk" },
      ),
    },
  };
}

function door(save: Save): Script {
  const shown =
    save.exhibit === "enter"
      ? "You put the hall on a public list. That is a serious act. It is not the same as being ready for what the list cannot print."
      : "You held the exhibition. Ren will sulk in a straight line, which is his most honest shape. You did not hide from the decision.";
  const rank =
    save.martialLevel >= 4
      ? "You are Martial 4. Defend it. A public rank that you cannot repeat when you are tired is a costume."
      : save.martialLevel >= 3
        ? "You are Martial 3. Ren's number is no longer a ceiling you get to gesture at. It is a person you can reach, on a good day, if your feet agree with your eyes."
        : "You are still Martial 2. I am not shaming you. I am refusing to let a sentence become an excuse to skip the floors.";
  return {
    id: "door",
    start: "a",
    nodes: {
      a: node("Hana Okabe", `${shown} ${rank}`, { next: "b" }),
      b: node(
        "Hana Okabe",
        "You want the margin explained. Then hear it once. The ninth is a door, not a ceiling. The city has no public rank past nine, and I will not invent one so the five of you have a ladder to stare at. I have stood at six for years. Six is not humility. Six is the work.",
        { next: "c" },
      ),
      c: node(
        "Hana Okabe",
        "He watched the doorway, at the end, and called it finishing a count. I disliked the precision. I still dislike it. That is not a sentence you get to frame, and it is not a rank you inherit. The intact notes will carry a careful student to Martial 4. After that, the page is torn. Wanting the rest of it does not glue it back.",
        {
          choices: [
            { label: "I'll stay on the floors I can stand on.", goto: "d" },
            { label: "If the door is real, I need to know the rules.", goto: "e" },
          ],
        },
      ),
      d: node(
        "Hana Okabe",
        "Good. The house is still a house. The hall is still a hall. Come back to the floor when you want the strike to belong to you. I will be here if you keep it serious.",
        { effect: "second", close: "arc" },
      ),
      e: node(
        "Hana Okabe",
        "The rule you have is the one in front of you. Form, breath, and whether you can see a person in time to use what you saw. Understanding a counter is not the same as landing it. Anything past that is a rumour until your own hands make it boring. Do not ask me to skip you there.",
        { effect: "second", close: "arc" },
      ),
    },
  };
}
