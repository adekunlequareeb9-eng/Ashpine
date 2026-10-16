import type { Save } from "@/game/types";

export function objectives(save: Save) {
  if (save.era === "flashback") {
    return [{ id: "seal", text: "Speak with Master Shen", done: save.flags.seal }];
  }
  const friends = ["lin", "ren", "sable", "jonah"].filter((id) => save.met.includes(id)).length;
  const list = [
    {
      id: "friends",
      text: `Speak with the house (${Math.min(friends, 3)}/3)`,
      done: friends >= 3,
    },
    {
      id: "ledger",
      text: "Settle Gao's supply",
      done: save.decision != null,
    },
    {
      id: "practice",
      text: "Train the Ash Breath, or spar with Ren",
      done: save.flags.trained || save.flags.sparred,
    },
  ];
  if (save.decision) {
    list.push({
      id: "gate",
      text: "See who is asking at the gate",
      done: save.flags.adler,
    });
  }
  if (save.met.includes("sable") || save.flags.study) {
    list.push({
      id: "study",
      text: "Look through the locked study",
      done: save.flags.study,
    });
  }
  if (save.flags.chapter) {
    list.push({
      id: "council",
      text: "Hear the four in the courtyard",
      done: save.flags.council,
    });
  }
  if (save.flags.council) {
    list.push({
      id: "evening",
      text: "Close the hall with Hana",
      done: save.flags.evening,
    });
  }
  if (save.flags.evening && !save.flags.dawn) {
    list.push({
      id: "rest",
      text: "Sleep in the residence until the house opens",
      done: false,
    });
  }
  if (save.flags.dawn) {
    const branch =
      save.posture === "receive"
        ? "Receive Mr Hale. Jonah stays in the room."
        : save.posture === "refuse"
          ? "Read the letter under the gate stone"
          : "Walk to 14 Quay Stairs with Sable";
    list.push({ id: "branch", text: branch, done: save.flags.branch });
    if (save.flags.branch) {
      list.push({
        id: "exhibit",
        text: "Decide the winter exhibition",
        done: save.exhibit != null,
      });
    }
    if (save.exhibit) {
      list.push({
        id: "door",
        text: "Ask Hana what the ninth rank is",
        done: save.flags.second,
      });
    }
  }
  return list;
}

export function regardWord(n: number) {
  if (n >= 3) return "Close";
  if (n >= 2) return "Steady";
  if (n >= 1) return "Wary";
  return "Strained";
}

export function formatMinute(minute: number) {
  const total = 7 * 60 + 40 + Math.floor(minute);
  const dayAdd = Math.floor(total / (24 * 60));
  const m = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  const days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  return `${days[dayAdd % 7]} · ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function minutesUntilOpen(minute: number) {
  const day = 24 * 60;
  const open = 7 * 60 + 10;
  const start = 7 * 60 + 40;
  const clock = (start + Math.floor(minute)) % day;
  let add = (open - clock + day) % day;
  if (add < 90) add += day;
  return Math.floor(minute) + add;
}

export function pounds(n: number) {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

export function closingNotes(save: Save): string[] {
  const gao =
    save.decision === "pay"
      ? "You paid Gao's increase. The shelf will taste the same, and the week will be thin. Lin can defend the number."
      : save.decision === "exclusive"
        ? "You kept Gao's old price and gave him the season. Jonah will put a face on the paper. The harvest is now part of the house."
        : save.decision === "dock"
          ? "You bought the dock blend. Tomas will not lie about it. Some of the Wednesday regulars will notice, and Lin will have to stand in front of that."
          : "Gao's letter is still unanswered.";

  const floor =
    save.sparResult === "win"
      ? "You beat Ren in his own pattern. He is Martial 3. Rank stayed a fact. It was not the verdict."
      : save.sparResult === "draw"
        ? "The spar with Ren finished with both of you still up. A higher rank is not a promise."
        : save.sparResult === "loss"
          ? save.flags.punished
            ? "Ren put you down, and you still took the opening once. Seeing a counter and having the body for it were not the same thing. For a moment they were."
            : "Ren put you down. If you saw his long windup, your feet were still late. That gap is allowed to last longer than a morning."
          : save.flags.trained
            ? "You practised the Ash Breath and left the spar for another day. The floor was still used for what a floor is for."
            : "The hall was open. You did not spend it.";

  const posture =
    save.posture === "receive"
      ? "Adler's card is real. You will receive her people one at a time, and never alone. Jonah will be the second person in the room."
      : save.posture === "refuse"
        ? "You will not open the door to a clientele you cannot name. The card stays in the journal. Refusal is not the same as forgetting."
        : save.posture === "stairs"
          ? "You and Sable will walk to 14 Quay Stairs, and not with the question of where Shen went. That one has already been wasted."
          : "The woman at the gate left a card. The house has not decided what to do with it.";

  const study = save.flags.study
    ? save.flags.adler
      ? "Through the study glass: a green lamp, a cleared desk, a cream page with a pine-needle watermark. Adler's card is the same stock. She did not mention the study."
      : "Through the study glass: a green lamp, a cleared desk, a cream page with a pine-needle watermark. Your stationery uses an ash leaf."
    : "The study is still locked. The lamp in it has been on for six months. Sable has not used a brick.";

  return [
    gao,
    floor,
    posture,
    study,
    "Shen Wei is still gone. You do not have a sentence that would fit a frame. In the margin of his notes, the ninth martial rank is a door, not a ceiling, and you have not opened it. The house remains a house. It will be here in the morning.",
  ];
}

export function arcNotes(save: Save): string[] {
  const branch =
    save.posture === "receive"
      ? "Hale paid for forty minutes and did not ask where Shen went. Jonah stayed in the room. The rule held because you used it, not because you announced it."
      : save.posture === "refuse"
        ? "Adler did not send a second person to test the lock. The letter under the stone is a refusal accepted, not a mystery solved. The card is still in the journal."
        : "You and Sable stood at 14 Quay Stairs and asked about the paper, not the absence. Adler answered less than Sable wanted and more than a rumour would have.";
  const show =
    save.exhibit === "enter"
      ? "Ashpine is on the winter list. Open class, empty hands, six hundred pounds. Ren has his proof. Lin has a line she can explain."
      : save.exhibit === "hold"
        ? "You held the exhibition. Ren is early, not wrong, and he heard you say so without dressing it up as fear."
        : "The exhibition board is still unanswered.";
  const rank =
    save.martialLevel >= 4
      ? "You are Martial 4. That is a public rank. It changes a spar. It does not open the door."
      : save.martialLevel >= 3
        ? "You are Martial 3. Ren's number is no longer something you only stand under. The next intact page asks for more form, more breath, and insight you cannot grind out of a count."
        : "You are still Martial 2. Hana did not treat that as an insult. She treated it as a floor.";
  return [
    branch,
    show,
    `${rank} Hana said the ninth is a door, not a ceiling, and that the city has no public name past nine. She will not invent one. Shen Wei is still gone. Nobody in this house has a sentence that would fit a frame.`,
    "The yard is still a yard. Training, the ledger, and the four of them do not expire because a chapter found its last line. Time still moves only while you are here.",
  ];
}
