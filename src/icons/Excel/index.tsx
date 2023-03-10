import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.414}
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M307.5 103.75h-73.334c-5.028 0-9.167 4.139-9.167 9.166v38.959L307.5 200l41.25 17.405L390 200v-48.125z"
      fill="#21a366"
      fillRule="nonzero"
    />
    <path d="M224.999 151.875H307.5V200h-82.501z" fill="#107c41" />
    <path
      d="M380.834 103.75H307.5v48.125H390v-38.959c0-5.027-4.139-9.166-9.166-9.166z"
      fill="#33c481"
      fillRule="nonzero"
    />
    <path
      d="M307.5 200h-82.501v87.084c0 5.027 4.139 9.166 9.167 9.166h146.668c5.027 0 9.166-4.139 9.166-9.166v-38.959z"
      fill="#185c37"
      fillRule="nonzero"
    />
    <path d="M307.5 200H390v48.125h-82.5z" fill="#107c41" />
    <g fillRule="nonzero">
      <path
        d="M284.584 138.125H225V268.75h59.584c5.022-.014 9.152-4.144 9.166-9.166V147.291c-.014-5.022-4.144-9.152-9.166-9.166z"
        fillOpacity={0.094}
      />
      <g fillOpacity={0.2}>
        <path d="M277.709 145H225v130.625h52.709c5.022-.014 9.152-4.144 9.166-9.166V154.166c-.014-5.022-4.144-9.152-9.166-9.166z" />
        <path d="M277.709 145H225v116.875h52.709c5.022-.014 9.152-4.144 9.166-9.166v-98.543c-.014-5.022-4.144-9.152-9.166-9.166z" />
        <path d="M270.834 145H225v116.875h45.834c5.022-.014 9.152-4.144 9.166-9.166v-98.543c-.014-5.022-4.144-9.152-9.166-9.166z" />
      </g>
      <path
        d="M179.166 145h91.668c5.027 0 9.166 4.139 9.166 9.166v91.668c0 5.027-4.138 9.166-9.166 9.166h-91.668c-5.027 0-9.166-4.139-9.166-9.166v-91.668c0-5.027 4.139-9.166 9.166-9.166z"
        fill="#107c41"
      />
      <path
        d="m194.292 234.375 22.246-34.471-20.376-34.279h16.397l11.123 21.909c1.022 2.079 1.725 3.63 2.109 4.652h.144a95.895 95.895 0 0 1 2.302-4.843l11.889-21.718h15.055l-20.904 34.087 21.431 34.663h-16.014l-12.849-24.067a20.214 20.214 0 0 1-1.534-3.212h-.191a15.2 15.2 0 0 1-1.487 3.115l-13.232 24.164z"
        fill="#fff"
      />
    </g>
    <path d="M170 90h220v220H170z" fill="none" />
  </svg>
);

export default SvgComponent;
