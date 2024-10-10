import { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import MapChart, { DataPoint, PassingPoint } from "./charts/MapChart";
import { getMatchesByCriteria } from "./StrategyApp";

type TeamData = Record<string, Record<string, string>>;
const matchName = "Qual";
const mapName = "CRESCENDO";
interface TeamTabProps {}

const teamList = [
  "1574\tMisCar",
  "1576\tVoltrix",
  "1577\tSteampunk",
  "1580\tThe Blue Monkeys",
  "1657\tHamosad",
  "1690\tOrbit",
  "1937\tElysium",
  "1942\tCinderella Tel-Nof",
  "1943\tNeat Team",
  "1954\tElectroBunny",
  "2096\tRoboActive",
  "2212\tThe Spikes",
  "2230\tGeneral Angels",
  "2231\tOnyxTronix",
  "2630\tThunderbolts",
  "2679\tAtlantis",
  "3034\tGalileo",
  "3065\tJatt High School",
  "3075\tHa-Dream Team",
  "3083\tArtemis",
  "3211\tThe Y Team",
  "3316\tD-Bug",
  "3339\tBumbleB",
  "3388\tFlash in memory of Margarita Gusak",
  "3835\tVulcan",
  "4319\tLadies FIRST",
  "4320\tThe Joker",
  "4338\tFalcons",
  "4416\tSkynet",
  "4586\tPRIMO",
  "4590\tGreenBlitz",
  "4661\tCypher",
  "4744\tNinjas",
  "5135\tBlack Unicorns",
  "5291\tEmperius",
  "5554\tThe Poros Robotics",
  "5614\tTeam Sycamore",
  "5635\tDemacia",
  "5654\tPhoenix",
  "5715\tDRC",
  "5747\tAthena",
  "5928\tMetalBoost",
  "5951\tMakers Assemble",
  "5987\tGalaxia in memory of David Zohar",
  "5990\tTRIGON",
  "6049\tPegasus",
  "6104\tDesert Eagles",
  "6168\talzahrawi",
  "6230\tTeam Koi",
  "6738\tExcalibur",
  "6740\tG3 - Glue Gun & Glitter",
  "6741\tSpace monkeys",
  "7039\t❌⭕",
  "7067\tTeam Streak",
  "7112\tEverGreen",
  "7177\tAmal tayibe",
  "7554\tGreen Rockets",
  "7845\t8BIT",
  "8175\tPiece of Mind",
  "8223\tMariners",
  "8843\tAmal Space and Aviation Maale Adumim",
  "9303\tPO®️TAL to GOATland",
  "9304\tlegend's",
  "9738\tIonic Bond",
  "9739\tFirefly",
  "9740\tCAN://Bus",
  "9741\tSTORM",
];

function getTeamData(teamMatches: Record<string, string>[]): TeamData {
  const teamData: TeamData = {};
  teamMatches.forEach((match) => {
    const points: any[] = JSON.parse(match[mapName + "/Points"]);
    const matchNumber = match[matchName];
    function countDataFromMap(data: string, succesfulness: boolean) {
      return (
        points.filter((point) => {
          if (data === "Pass") {
            return point[0] && point[0]["data"] === "Pass";
          }
          return (
            point["data"] === data && point["successfulness"] === succesfulness
          );
        }).length + ""
      );
    }
    teamData[matchNumber] = {
      "Speaker Score": countDataFromMap("Speaker", true),
      "Speaker Miss": countDataFromMap("Speaker", false),
      "Pass Successful": countDataFromMap("Pass", true),
      "Pass Unsuccessful": countDataFromMap("Pass", false),
      "Amp Score": match[`${mapName}/Amp/Score`],
      "Amp Miss": match[`${mapName}/Amp/Score`],
      "Trap Score": match["Trap"] === "Scored" ? "1" : "0",
      "Trap Miss": match["Trap"] === "Miss" ? "1" : "0",
    };

    Object.entries(match)
      .filter(([key, _]) => key !== matchName && key !== mapName)
      .forEach(([key, value]) => (teamData[matchNumber][key] = value));
  });
  return teamData;
}

function getAsLine(team: TeamData, data: string) {
  const dataSet: Record<string, number> = {};
  Object.entries(team).forEach(([qual, match]) => {
    dataSet[qual] = parseInt(match[data]);
  });
  return dataSet;
}

function getAsPie(
  team: TeamData,
  data: string,
  colorMap: Record<string, string>
) {
  const dataSet: Record<string, [number, string]> = {};
  Object.entries(team).forEach(([_, match]) => {
    const dataValue = match[data];
    if (!dataSet[dataValue]) {
      dataSet[dataValue] = [0, colorMap[dataValue]];
    }
    dataSet[dataValue][0]++;
  });
  return dataSet;
}

function getAccuracy(
  team: TeamData,
  data1: string,
  data2: string,
  recency?: number
) {
  let sum1 = 0;
  let sum2 = 0;
  const matches = Object.values(team);
  if (recency) {
    matches.splice(matches.length - recency);
  }
  matches.forEach((match) => {
    sum1 += parseInt(match[data1]);
    sum2 += parseInt(match[data2]);
  });
  return (sum1 / (sum1 + sum2)) * 100;
}

function getAllPoints(matches: Record<string, string>[]) {
  let points: (DataPoint | PassingPoint)[] = [];
  Object.values(matches).forEach((match) => {
    const mapPoints: (DataPoint | PassingPoint)[] = JSON.parse(
      match[mapName + "/Points"]
    );
    points = [...points, ...mapPoints];
  });
  return points;
}

const TeamTab: React.FC<TeamTabProps> = () => {
  const [matches, setMatches] = useState<Record<string, string>[]>([]);
  const teamData = getTeamData(matches);

  useEffect(() => console.log(teamData), [teamData]);

  const ampAccuracy = getAccuracy(teamData, "Amp Score", "Amp Miss");
  const speakerAccuracy = getAccuracy(
    teamData,
    "Speaker Score",
    "Speaker Miss"
  );
  const trapAccuracy = getAccuracy(teamData, "Trap Score", "Trap Miss");
  const passAccuracy = getAccuracy(
    teamData,
    "Pass Successful",
    "Pass Unsuccessful"
  );

  return (
    <div className="strategy-app">
      <div className="section">
        <h2>Scoring</h2>
        <LineChart
          height={300}
          width={400}
          dataSets={{
            Speaker: ["pink", getAsLine(teamData, "Speaker Score")],
            Amp: ["yellow", getAsLine(teamData, "Amp Score")],
            Pass: ["purple", getAsLine(teamData, "Pass Successful")],
          }}
        />
      </div>

      <div className="section">
        <h2>Miss</h2>
        <LineChart
          height={300}
          width={400}
          dataSets={{
            Speaker: ["pink", getAsLine(teamData, "Speaker Miss")],
            Amp: ["yellow", getAsLine(teamData, "Amp Miss")],
            Pass: ["purple", getAsLine(teamData, "Pass Unsuccessful")],
          }}
        />
      </div>

      <div className="section">
        <h2>Trap</h2>
        <PieChart
          pieData={getAsPie(teamData, "Trap", {
            Scored: "purple",
            Miss: "cyan",
            "Didn't Score": "yellow",
          })}
        />
      </div>

      <div className="section">
        <h2>Climb</h2>
        <PieChart
          pieData={getAsPie(teamData, "Climb", {
            "Climbed Alone": "purple",
            Harmony: "cyan",
            Team: "yellow",
            Park: "orange",
            "Not On Stage": "red",
          })}
        />
      </div>

      <div className="section">
        <h2>Amp Accuracy</h2>
        <PieChart
          pieData={{
            Score: [ampAccuracy, "green"],
            Miss: [100 - ampAccuracy, "crimson"],
          }}
        />
      </div>

      <div className="section">
        <h2>Speaker Accuracy</h2>
        <PieChart
          pieData={{
            Score: [speakerAccuracy, "green"],
            Miss: [100 - speakerAccuracy, "crimson"],
          }}
        />
      </div>
      <div className="section">
        <h2>Pass Accuracy</h2>
        <PieChart
          pieData={{
            Score: [passAccuracy, "green"],
            Miss: [100 - passAccuracy, "crimson"],
          }}
        />
      </div>

      <div className="section">
        <h2>Map</h2>
        <MapChart
          width={540}
          height={240}
          imagePath={"./src/assets/Crescendo Map.png"}
          dataPoints={getAllPoints(matches)}
        />
      </div>

      <br />
      <label htmlFor="team number">Team Number</label>

      <select
        id="team number"
        name="team number"
        onChange={async (event) =>
          setMatches(
            await getMatchesByCriteria(
              "Team Number",
              event.target.value.slice(0, 4) || "0"
            )
          )
        }
      >
        {teamList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamTab;
