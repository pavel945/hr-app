import React from 'react';
import Loader from 'react-loader-spinner';

import styles from './Spinner.module.css';

const spinner = () => {

    let classes = ['loader', styles.Spinner];

    return (
        <div className={classes.join(' ')}>
            <Loader
                type="Oval"
                color="#007bff"
                height={50}
                width={50} />
        </div>
    )
}

export default spinner;