import Card from "../../components/CardComponent";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Words } from "@acme/db";
import { CustomCardObject } from "../../types";
import { PageLayout } from "../../components/Layout";

export default function Home() {
  const wordQuery = trpc.word.all.useQuery();

  useEffect(() => {
    if (wordQuery.data !== undefined) {
      setCards(wordQuery.data);
    }
  }, [wordQuery.data]);

  const [cards, setCards] = useState<Words[] | null>(
    wordQuery.data === undefined ? null : wordQuery.data,
  );

  const activeIndex = cards === null ? 0 : cards.length - 1;
  const removeCard = (id: string, action: "right" | "left") => {
    setCards((prev) =>
      prev === null ? null : prev.filter((card) => card.id !== id),
    );
    if (action === "right") {
      console.log("setRightSwipe");
    } else {
      console.log("setLeftSwipe");
    }
  };

  const lastCardData: CustomCardObject = {
    id: "last",
    personId: "",
    word: "",
    wordFromCountry: "",
    translation: "",
    translationFromCountry: "",
    createdAt: "",
    updatedAt: "",
    endTextNo1: "You made a full set",
    endTextNo2: "How you want to reload your data?",
    endTextNo3: "",
  };
  return (
    <PageLayout>
      <div
        className=" text-textGrey relative flex h-full w-full justify-center overflow-clip pt-40"
        style={{ backgroundColor: "#11151C" }}
      >
        <AnimatePresence>
          {cards === null ? (
            0
          ) : cards.length ? (
            cards.map((card, index) => (
              <Card
                key={card.id}
                data={card}
                active={index === activeIndex}
                removeCard={removeCard}
              />
            ))
          ) : (
            <>
              <h2 className="pb-24 text-4xl font-extrabold text-white">
                Congratulations
              </h2>
              <Card
                key="last"
                data={lastCardData}
                active={true}
                removeCard={removeCard}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
