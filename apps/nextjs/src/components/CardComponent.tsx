import { CardProps } from "../types";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import {
  easeIn,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import SwipeButton from "./SwipeButton";
import styles from "../styles/card.module.css";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const CardComponent = ({ data, active, removeCard }: CardProps) => {
  const countriesQuery = trpc.countries.all.useQuery();
  const matchingWordCountry = countriesQuery.data?.find(
    (country) => country.name === data.wordFromCountry,
  );
  const matchingTranslationCountry = countriesQuery.data?.find(
    (country) => country.name === data.translationFromCountry,
  );
  const [exitX, setExitX] = useState(0);
  const [replay, setReplay] = useState(true);
  const [animationState, setAnimationState] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isTanslated, setIsTanslated] = useState(true);
  const [delayedText, setDelayedText] = useState(
    data && data.word !== undefined ? data.word : " ",
  );
  const [delayedSrc, setDelayedSrc] = useState(
    data && matchingWordCountry?.imageSrc !== undefined
      ? matchingWordCountry?.imageSrc
      : " ",
  );
  const [delayedAlt, setDelayedAlt] = useState(
    data && data.wordFromCountry !== undefined ? data.wordFromCountry : " ",
  );

  useEffect(() => {
    if (data && matchingWordCountry?.imageSrc !== undefined) {
      setDelayedSrc(matchingWordCountry?.imageSrc);
    }
  }, [data, matchingWordCountry?.imageSrc]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const dragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!animationState && info.offset.x > 100) {
      setExitX(200);
      removeCard(data.id, "right");
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data.id, "left");
    }
  };

  return (
    <>
      <SwipeButton
        exit={setExitX}
        removeCard={removeCard}
        id={data.id}
        animationState={animationState}
      />
      {active ? (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className={styles.deck}
          onDragEnd={dragEnd}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          style={{ x, rotate, opacity }}
          transition={{ type: "tween", duration: 0.3, ease: easeIn }}
          whileDrag={{ cursor: "grabbing" }}
          exit={{ x: exitX }}
          onClick={() => {
            if (!animationState) {
              setAnimationState(true);
              setTimeout(() => setAnimationState(false), 800);
              setIsTanslated(!isTanslated);
              setTimeout(() => {
                setDelayedText(
                  isTanslated === false
                    ? data && data.word !== undefined
                      ? data.word
                      : " "
                    : data && data.translation !== undefined
                    ? data.translation
                    : " ",
                );
              }, 600);
              setTimeout(() => {
                setDelayedSrc(
                  isTanslated === false
                    ? data && matchingWordCountry?.imageSrc !== undefined
                      ? matchingWordCountry?.imageSrc
                      : " "
                    : data && matchingTranslationCountry?.imageSrc !== undefined
                    ? matchingTranslationCountry?.imageSrc
                    : " ",
                );
              }, 600);
              setTimeout(() => {
                setDelayedAlt(
                  isTanslated === false
                    ? data && data.wordFromCountry !== undefined
                      ? data.wordFromCountry
                      : " "
                    : data && data.translationFromCountry !== undefined
                    ? data.translationFromCountry
                    : " ",
                );
              }, 600);
              setReplay(!replay);
              setIsExpanding(true);
              setTimeout(() => setIsExpanding(false), 500);
              setTimeout(() => setReplay(true), 600);
            }
          }}
        >
          <Card
            shadow={false}
            className="relative grid h-full w-full max-w-[28rem] items-end justify-center overflow-hidden rounded-lg text-center"
          >
            <CardBody className="py-10 md:px-12">
              <div
                color="black"
                className="mb-36 max-w-[30vh]  font-medium leading-[1.5]"
              >
                <span className="max-w-[30vh] break-words text-2xl">
                  {delayedText}
                </span>
              </div>
              <div className="flex items-center justify-center">
                {delayedSrc != " " ? (
                  <Image
                    src={delayedSrc}
                    alt={`${delayedAlt} flag waving`}
                    width={40}
                    height={40}
                    quality={100}
                    style={{ width: "auto" }}
                  />
                ) : (
                  delayedSrc
                )}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {animationState && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isExpanding ? [0, 1] : [1, 0],
                      transition: {
                        duration: 0.5,
                        times: [0, 0.5],
                        ease: "circIn",
                      },
                    }}
                    style={{
                      originX: isExpanding ? 0 : 1,
                      borderRadius: "0.5rem",
                    }}
                    className="privacy-screen"
                  />
                )}
              </AnimatePresence>
            </CardBody>
          </Card>
        </motion.div>
      ) : null}
    </>
  );
};

export default CardComponent;
