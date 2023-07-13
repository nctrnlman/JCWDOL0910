import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { getProfile } from "../features/ProfileSlice";
// import { Link, useNavigate } from "react-router-dom";

function ImageProfileUploader() {
    var loadFile = function (event) {

        var input = event.target;
        var file = input.files[0];
        var type = file.type;

        var output = document.getElementById('preview_img');


        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    };

    return (
        <div>
            <form>
                <div class="grid grid-cols-1 grid-rows-3 items-center space-x-6">
                    <div class=" row-start-1 shrink-0">
                        <img id='preview_img' class="h-16 w-16 object-cover rounded-full" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
                    </div>
                    <label class=" row-start-2 block">
                        <span class=" sr-only">Choose profile photo</span>
                        <input type="file" onchange="loadFile(event)" class="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default ImageProfileUploader;

