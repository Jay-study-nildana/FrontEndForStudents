import React, { Fragment } from "react";
import APODWithLocalImage from "../NASAAPOD/APODWithLocalImage";
import APODWithDirectURL from "../NASAAPOD/APODWithDirectURL";
import APODWithAPI from "../NASAAPOD/APODWithAPI"

const NASAImage = () => (
    <Fragment>
        <APODWithAPI/>
        <APODWithDirectURL/>
        <APODWithLocalImage/>
    </Fragment>

);

export default NASAImage;