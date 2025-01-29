import axios from "axios";
import UserStorageService from "./UserStorageService";
import React, { useState } from 'react';

const BASE_REST_API_URL = "http://localhost:8084/users/";

class AuthServices {
    login(user) {
        return axios.post(BASE_REST_API_URL + "login", user);
    }

}


const authServices = new AuthServices();
export default authServices;
