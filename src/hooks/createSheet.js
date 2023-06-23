import { useEffect, useState, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";