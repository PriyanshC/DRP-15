import React from "react";
import './Loading.css';

export default function Loading() {
  return (
    <svg width={'100%'} height={'100%'} viewBox="0 0 600 600" className="LoadingSpinner">
      <path d="M300,100 A200,200 0 1 0 500,300" stroke="currentColor" strokeWidth={15} fill="none" />
    </svg>
  );
}