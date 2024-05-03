import axios from "axios";
import {
  setHero,
  setSearchQuery,
  setDetail,
  setSearchHero,
} from "../reducers/dataReducers";

export const getAllDataHero = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.dazelpro.com/mobile-legends/hero`
    );
    dispatch(setHero(response.data));
    console.log("cekkk data :", response.data);
  } catch (error) {
    console.log("error", error);
  }
};

export const searchDataHero = (heroName, filterRole) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.dazelpro.com/mobile-legends/role?roleName=${filterRole}`
    );
    dispatch(setSearchQuery(heroName));
    console.log("responseSearch", response.data);
    console.log("filterRoleaction", filterRole);
    dispatch(setSearchHero(response.data.hero));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDetailHero = (heroId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.dazelpro.com/mobile-legends/hero/${heroId}`
    );
    dispatch(setDetail(response.data.hero[0]));
  } catch (error) {
    console.log("error", error);
  }
};
