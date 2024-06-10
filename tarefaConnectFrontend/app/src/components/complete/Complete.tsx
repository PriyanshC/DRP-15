import React from 'react';
import './Complete.css';

interface Props {
    size: number
}

export default function Complete({ size }: Props) {
    return (
        <i className='Icon bi-check-circle' style={{ fontSize: size + 'px' }}></i>
    );
}