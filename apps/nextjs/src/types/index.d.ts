import { Words } from "@acme/db";
import { SetStateAction } from "react";

type TracksData = {
  name: string;
  artist: string;
};

export type CardProps = {
  data: Words | CustomCardObject;
  active: boolean;
  removeCard: (id: string, action: "right" | "left") => void;
};

export type CustomCardObject = {
  id: string;
  personId: string;
  word: string;
  wordFromCountry: string;
  translation: string;
  translationFromCountry: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  endTextNo1: string;
  endTextNo2: string;
  endTextNo3: string;
};

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: string, action: "right" | "left") => void;
  id: string;
  animationState: boolean;
};

export type TableRowProps = {
  word: string;
  translaltion: string;
  wordAltText: string;
  wordImageSrc: string;
  translationImageSrc: string;
  translationAltText: string;
};

export interface FormToDatabaseRecordProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;

  formName?: string;
}

export interface FormToDatabaseRecordState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
  selected: string;
  open: boolean;
  disabled: boolean;
}
