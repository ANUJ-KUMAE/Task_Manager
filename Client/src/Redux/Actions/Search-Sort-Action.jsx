import axios from "axios";
import { SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SECCESS } from "../Constants/WorkConstant";

const SearchAction = (value) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const AuthorizationToken = `Bearer ${token}`;

    const configData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthorizationToken,
      },
    };

    const { data } = await axios.get(
      `/api/work/searchData/${value}`,
      configData
    );

    dispatch({ type: SEARCH_PRODUCT_SECCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

export { SearchAction };
