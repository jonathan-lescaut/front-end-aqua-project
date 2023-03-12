import React from "react";
import Kit from "./Instructions/Kit";
import Meuble from "./Instructions/Meuble";
import Nano from "./Instructions/Nano";
import Cuve from "./Instructions/Cuve";
import Littrage1 from "./Instructions/Littrage1";
import Littrage2 from "./Instructions/Littrage2";
import Littrage3 from "./Instructions/Littrage3";
import Littrage4 from "./Instructions/Littrage4";
import Littrage5 from "./Instructions/Littrage5";
import Littrage6 from "./Instructions/Littrage6";
import Littrage7 from "./Instructions/Littrage7";
import Littrage8 from "./Instructions/Littrage8";

const StartInstruction = ({ handleHover, hoveredId }) => {
  console.log(hoveredId);
  return (
    <>
      <div className="BlocInstruction">
        <div>
          {hoveredId === null ? (
            <>
              {" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
              harum consequatur dolore aperiam officia vel quia voluptates odit
              sint excepturi, libero adipisci officiis non cum assumenda aliquam
              voluptas quidem unde. Tempora aliquid maiores numquam nemo, non
              aliquam quos omnis excepturi cumque voluptatem corrupti,
              perspiciatis deleniti laboriosam autem. Quam saepe excepturi
              minus, quia ipsam, accusamus facilis exercitationem nihil quos
              obcaecati eaque! Doloremque sequi reprehenderit fugiat quibusdam
              quaerat, eveniet quisquam nulla quo repellat est rerum aut earum
              iusto repudiandae laudantium natus saepe aspernatur omnis
              doloribus modi esse itaque corrupti eligendi? Quam, perspiciatis!{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "type1" ? (
            <>
              {" "}
              Kit d'aquarium <Kit />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "type2" ? (
            <>
              {" "}
              Kit d'aquarium <Meuble />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "type3" ? (
            <>
              {" "}
              Nano <Nano />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "type4" ? (
            <>
              {" "}
              Cuve seule <Cuve />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage1" ? (
            <>
              {" "}
              20 X 20 X 25 cm <Littrage1 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage2" ? (
            <>
              {" "}
              25 X 25 X 30 cm <Littrage2 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage3" ? (
            <>
              {" "}
              60 X 30 X 30 cm <Littrage3 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage4" ? (
            <>
              {" "}
              80 X 35 X 35 cm <Littrage4 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage5" ? (
            <>
              {" "}
              100 X 40 X 40 cm <Littrage5 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage6" ? (
            <>
              {" "}
              120 X 40 X 50 cm <Littrage6 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage7" ? (
            <>
              {" "}
              150 X 50 X 60 cm <Littrage7 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>
          {hoveredId === "littrage8" ? (
            <>
              {" "}
              200 X 60 X 60 cm <Littrage8 />{" "}
            </>
          ) : null}{" "}
        </div>
        <div>{hoveredId === "littrage8" ? "200 X 60 X 60 cm" : null} </div>
      </div>
    </>
  );
};
export default StartInstruction;
