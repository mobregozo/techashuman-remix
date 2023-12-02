"use client";
import { useEffect, useRef, useState } from "react"

export const Avatar = () => {
  const [eyeBallX, setEyeBallX] = useState(14);
  const [eyeBallY, setEyeBallY] = useState(10);

  const eyeElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eyeRect = eyeElement?.current?.getBoundingClientRect();
      const groupRect = eyeElement?.current?.parentNode?.getBoundingClientRect();
      
      const groupOffsetX = groupRect.left;
      const groupOffsetY = groupRect.top;

      const eyeCenterX = eyeRect.left - groupOffsetX + eyeRect.width / 2+6;
      const eyeCenterY = eyeRect.top - groupOffsetY + eyeRect.height / 2 + 2;

      const cursorX = event.clientX - groupOffsetX;
      const cursorY = event.clientY - groupOffsetY;

      const angle = Math.atan2(cursorY - eyeCenterY, cursorX - eyeCenterX);
      const radius = 6; // Adjust this value to set the radius of the circular path

      const maxEyeBallX = eyeCenterX + radius * Math.cos(angle);
      const maxEyeBallY = eyeCenterY + radius * Math.sin(angle);

      // Clamp the eye-ball positions within the boundaries
      const clampedEyeBallX = Math.max(eyeCenterX - radius, Math.min(maxEyeBallX, eyeCenterX + radius));
      const clampedEyeBallY = Math.max(eyeCenterY - radius, Math.min(maxEyeBallY, eyeCenterY + radius));

      setEyeBallX(clampedEyeBallX);
      setEyeBallY(clampedEyeBallY);
      // 264 280
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      aria-label="Avatar created with getavataaars.com"
      viewBox="0 0 264 280"
      version="1.1"
      className="group w-24 sm:w-40 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>Created with getavataaars.com</desc>
      <defs>
        <circle id="react-path-1" cx="120" cy="120" r="120"></circle>
        <path
          d="M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z"
          id="react-path-2"
        ></path>
        <path
          d="M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z"
          id="react-path-3"
        ></path>
      </defs>
      <g
        id="Avataaar"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(-825.000000, -1100.000000)"
          id="Avataaar/Circle"
        >
          <g transform="translate(825.000000, 1100.000000)">
            <g
              id="Circle"
              strokeWidth="0"
              fillRule="evenodd"
              transform="translate(12.000000, 40.000000)"
            >
              <mask id="react-mask-4" fill="white">
                <use xlinkHref="#react-path-1"></use>
              </mask>
              <use
                id="Circle-Background"
                fill="transparent"
                xlinkHref="#react-path-1"
              ></use>
              <g
                id="Color/Palette/Blue-01"
                mask="url(#react-mask-4)"
                className=" fill-primary-700 dark:fill-primary-900"
                fill="#65C9FF"
              >
                <rect id="🖍Color" x="0" y="0" width="240" height="240"></rect>
              </g>
            </g>
            <mask id="react-mask-5" fill="white">
              <use xlinkHref="#react-path-2"></use>
            </mask>
            <g id="Mask"></g>
            <g
              id="Avataaar"
              strokeWidth="1"
              fillRule="evenodd"
              mask="url(#react-mask-5)"
            >
              <g id="Body" transform="translate(32.000000, 36.000000)">
                <mask id="react-mask-6" fill="white">
                  <use xlinkHref="#react-path-3"></use>
                </mask>
                <use fill="#D0C6AC" xlinkHref="#react-path-3"></use>
                <g
                  id="Skin/👶🏽-03-Brown"
                  mask="url(#react-mask-6)"
                  fill="#EDB98A"
                >
                  <g transform="translate(0.000000, 0.000000)" id="Color">
                    <rect x="0" y="0" width="264" height="240"></rect>
                  </g>
                </g>
                <path
                  d="M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z"
                  id="Neck-Shadow"
                  fillOpacity="0.100000001"
                  fill="#000000"
                  mask="url(#react-mask-6)"
                ></path>
              </g>
              <g
                id="Clothing/Hoodie"
                transform="translate(0.000000, 170.0000000)"
              >
                <defs>
                  <path
                    d="M108,13.0708856 C90.0813006,15.075938 76.2798424,20.5518341 76.004203,34.6449676 C50.1464329,45.5680933 32,71.1646257 32,100.999485 L32,100.999485 L32,110 L232,110 L232,100.999485 C232,71.1646257 213.853567,45.5680933 187.995797,34.6449832 C187.720158,20.5518341 173.918699,15.075938 156,13.0708856 L156,32 L156,32 C156,45.254834 145.254834,56 132,56 L132,56 C118.745166,56 108,45.254834 108,32 L108,13.0708856 Z"
                    id="react-path-197"
                  ></path>
                </defs>
                <mask id="react-mask-198" fill="white">
                  <use xlinkHref="#react-path-197"></use>
                </mask>
                <use
                  id="Hoodie"
                  fill="#262e33"
                  fillRule="evenodd"
                  xlinkHref="#react-path-197"
                ></use>
                <g
                  id="Color/Palette/Gray-01"
                  mask="url(#react-mask-198)"
                  className=" bg-primary-600"
                  fill="#262e33"
                >
                  <rect id="🖍Color" x="0" y="0" width="264" height="110"></rect>
                </g>
                <path
                  d="M102,61.7390531 L102,110 L95,110 L95,58.1502625 C97.2037542,59.4600576 99.5467694,60.6607878 102,61.7390531 Z M169,58.1502625 L169,98.5 C169,100.432997 167.432997,102 165.5,102 C163.567003,102 162,100.432997 162,98.5 L162,61.7390531 C164.453231,60.6607878 166.796246,59.4600576 169,58.1502625 Z"
                  id="Straps"
                  fill="#F4F4F4"
                  fillRule="evenodd"
                  mask="url(#react-mask-198)"
                ></path>
                <path
                  d="M90.9601329,12.7243537 C75.9093095,15.5711782 65.5,21.2428847 65.5,32.3076923 C65.5,52.0200095 98.5376807,68 132,68 C165.462319,68 198.5,52.0200095 198.5,32.3076923 C198.5,21.2428847 188.09069,15.5711782 173.039867,12.7243537 C182.124921,16.0744598 188,21.7060546 188,31.0769231 C188,51.4689754 160.178795,68 132,68 C103.821205,68 76,51.4689754 76,31.0769231 C76,21.7060546 81.8750795,16.0744598 90.9601329,12.7243537 Z"
                  id="Shadow"
                  fillOpacity="0.16"
                  fill="#000000"
                  fillRule="evenodd"
                  mask="url(#react-mask-198)"
                ></path>
              </g>
              <g
                id="Face"
                transform="translate(76.000000, 82.000000)"
                fill="#000000"
              >
                <g id="Mouth/Smile" transform="translate(2.000000, 52.000000)">
                  <defs>
                    <path
                      d="M35.117844,15.1280772 C36.1757121,24.6198025 44.2259873,32 54,32 C63.8042055,32 71.8740075,24.574136 72.8917593,15.0400546 C72.9736685,14.272746 72.1167429,13 71.042767,13 C56.1487536,13 44.7379213,13 37.0868244,13 C36.0066168,13 35.0120058,14.1784435 35.117844,15.1280772 Z"
                      id="react-path-225"
                    ></path>
                  </defs>
                  <mask id="react-mask-226" fill="white">
                    <use xlinkHref="#react-path-225"></use>
                  </mask>
                  <use
                    id="Mouth"
                    fillOpacity="0.699999988"
                    fill="#000000"
                    fillRule="evenodd"
                    xlinkHref="#react-path-225"
                  ></use>
                  <rect
                    id="Teeth"
                    fill="#FFFFFF"
                    fillRule="evenodd"
                    mask="url(#react-mask-226)"
                    x="39"
                    y="2"
                    width="31"
                    height="16"
                    rx="5"
                  ></rect>
                  <g
                    id="Tongue"
                    strokeWidth="1"
                    fillRule="evenodd"
                    mask="url(#react-mask-226)"
                    fill="#FF4F6D"
                  >
                    <g transform="translate(38.000000, 24.000000)">
                      <circle cx="11" cy="11" r="11"></circle>
                      <circle cx="21" cy="11" r="11"></circle>
                    </g>
                  </g>
                </g>
                <g
                  id="Nose/Default"
                  transform="translate(28.000000, 40.000000)"
                  fillOpacity="0.16"
                >
                  <path
                    d="M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8"
                    id="Nose"
                  ></path>
                </g>
                <g
                  id="Eyes/Squint-😊"
                  transform="translate(0.000000, 8.000000)"
                >
                  <defs>
                    <path
                      d="M14,14.0481187 C23.6099827,14.0481187 28,18.4994466 28,11.5617716 C28,4.62409673 21.7319865,0 14,0 C6.2680135,0 0,4.62409673 0,11.5617716 C0,18.4994466 4.39001726,14.0481187 14,14.0481187 Z"
                      id="react-path-229"
                    ></path>
                    <path
                      d="M14,14.0481187 C23.6099827,14.0481187 28,18.4994466 28,11.5617716 C28,4.62409673 21.7319865,0 14,0 C6.2680135,0 0,4.62409673 0,11.5617716 C0,18.4994466 4.39001726,14.0481187 14,14.0481187 Z"
                      id="react-path-230"
                    ></path>
                  </defs>
                  <g id="Left-Eye" transform="translate(16.000000, 13.000000)" >
                    <mask id="react-mask-231" fill="white">
                      <use xlinkHref="#react-path-229"></use>
                    </mask>
                    <use
                      id="The-white-stuff"
                      fill="#FFFFFF"
                      ref={eyeElement}
                      xlinkHref="#react-path-229"
                    ></use>
                    <circle
                      fillOpacity="0.699999988"
                      fill="#000000"
                      mask="url(#react-mask-231)"
                      // cx="14"
                      // cy="10"
                      cx={eyeBallX.toString()}
                      cy={eyeBallY.toString()}
                      r="6"
                    ></circle>
                    {/* <circle cx={eyeBallX} cy={eyeBallY} r="6" fill="#000000" /> */}
                  </g>
                  <g id="Right-Eye" transform="translate(68.000000, 13.000000)">
                    <mask
                      id="react-mask-232"
                      fill="white"
                    >
                      <use xlinkHref="#react-path-230"></use>
                    </mask>
                    <use
                      id="Eyeball-Mask"
                      fill="#FFFFFF"
                      xlinkHref="#react-path-230"
                    ></use>
                    <circle
                      fillOpacity="0.699999988"
                      fill="#000000"
                      mask="url(#react-mask-232)"
                      
                      cx={eyeBallX.toString()}
                      cy={eyeBallY.toString()}

                      // cx={leftEyeX}
                      // cy={leftEyeY}
                      r="6"
                    ></circle>
                  </g>
                </g>
                <g
                  id="Eyebrow/Natural/Default-Natural"
                  fillOpacity="0.599999964"
                >
                  <path
                    d="M26.0390934,6.21012364 C20.2775554,6.98346216 11.2929313,12.0052479 12.04426,17.8178111 C12.0689481,18.0080543 12.3567302,18.0673468 12.4809077,17.9084937 C14.9674041,14.7203351 34.1927973,10.0365481 41.1942673,11.0147151 C41.8350523,11.1044465 42.2580662,10.4430343 41.8210501,10.0302067 C38.0765663,6.49485426 31.2003792,5.51224825 26.0390934,6.21012364"
                    id="Eyebrow"
                    transform="translate(27.000000, 12.000000) rotate(5.000000) translate(-27.000000, -12.000000) "
                  ></path>
                  <path
                    d="M85.0390934,6.21012364 C79.2775554,6.98346216 70.2929313,12.0052479 71.04426,17.8178111 C71.0689481,18.0080543 71.3567302,18.0673468 71.4809077,17.9084937 C73.9674041,14.7203351 93.1927973,10.0365481 100.194267,11.0147151 C100.835052,11.1044465 101.258066,10.4430343 100.82105,10.0302067 C97.0765663,6.49485426 90.2003792,5.51224825 85.0390934,6.21012364"
                    id="Eyebrow"
                    transform="translate(86.000000, 12.000000) scale(-1, 1) rotate(5.000000) translate(-86.000000, -12.000000) "
                  ></path>
                </g>
              </g>
              <g id="Top" strokeWidth="1" fillRule="evenodd">
                <defs>
                  <rect
                    id="react-path-149"
                    x="0"
                    y="0"
                    width="264"
                    height="280"
                  ></rect>
                  <path
                    d="M183.679824,38.9488198 C189.086072,33.9985622 190.387393,23.9615454 187.317704,17.4493246 C183.549263,9.45385312 175.901319,8.45217737 168.572342,11.9686703 C161.664469,15.2835661 155.515175,16.3878671 147.950196,14.7817319 C140.691624,13.2406923 133.805566,10.5226172 126.303388,10.0762471 C113.978028,9.34292483 102.003367,13.914565 93.6031232,23.1292512 C92.0003538,24.8871655 90.7089493,26.8971594 89.4882796,28.9343872 C88.5115454,30.5644351 87.4105298,32.3133822 86.9950459,34.1921885 C86.7973853,35.0855929 87.165272,37.2898774 86.7203704,38.0218712 C86.2391099,38.8123183 84.4244668,39.5373375 83.6510124,40.1238625 C82.0842713,41.3125222 80.7267597,42.6539573 79.4713836,44.1710842 C76.8052796,47.3926541 75.3376994,50.7577001 74.1034777,54.7428152 C70.0005333,67.9877849 69.6528094,83.7412616 74.9569218,96.7467724 C75.6639385,98.4811062 77.8550622,102.098564 79.1431613,98.3847912 C79.3976741,97.6508047 78.8086588,95.1907873 78.8099809,94.4501584 C78.8146084,91.7300906 80.3160587,73.7213568 86.857084,63.6330196 C88.9862338,60.3491948 98.8298903,48.0522456 100.840541,47.9536058 C101.9058,49.6464245 112.720532,60.4624529 140.783385,59.1948919 C153.445253,58.6229725 163.18265,52.9341181 165.520833,50.4680909 C166.549375,56.0008881 178.51323,64.2839965 180.33625,67.6921976 C185.602529,77.5376948 186.770677,97.9957204 188.780988,97.9573368 C190.791299,97.9189532 192.234429,92.7197798 192.647929,91.7270713 C195.719601,84.351669 196.242509,75.0948338 195.914948,67.1684434 C195.487565,56.9663626 191.276535,45.9419513 183.679824,38.9488198 Z"
                    id="react-path-148"
                  ></path>
                  <filter
                    x="-0.8%"
                    y="-2.0%"
                    width="101.5%"
                    height="108.0%"
                    filterUnits="objectBoundingBox"
                    id="react-filter-145"
                  >
                    <feOffset
                      dx="0"
                      dy="2"
                      in="SourceAlpha"
                      result="shadowOffsetOuter1"
                    ></feOffset>
                    <feColorMatrix
                      values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0"
                      type="matrix"
                      in="shadowOffsetOuter1"
                      result="shadowMatrixOuter1"
                    ></feColorMatrix>
                    <feMerge>
                      <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                  </filter>
                </defs>
                <mask id="react-mask-147" fill="white">
                  <use xlinkHref="#react-path-149"></use>
                </mask>
                <g id="Mask"></g>
                <g id="Top/Short-Hair/Short-Waved" mask="url(#react-mask-147)">
                  <g transform="translate(-1.000000, 0.000000)">
                    <mask id="react-mask-146" fill="white">
                      <use xlinkHref="#react-path-148"></use>
                    </mask>
                    <use
                      id="Short-Hair"
                      stroke="none"
                      fill="#9d604e"
                      fillRule="evenodd"
                      xlinkHref="#react-path-148"
                    ></use>
                    <g
                      id="Skin/👶🏽-03-Brown"
                      mask="url(#react-mask-146)"
                      fill="#9d604e"
                    >
                      <g transform="translate(0.000000, 0.000000) " id="Color">
                        <rect x="0" y="0" width="264" height="280"></rect>
                      </g>
                    </g>
                    <g
                      id="Top/_Resources/Prescription-02"
                      fill="none"
                      transform="translate(62.000000, 85.000000)"
                      strokeWidth="1"
                    >
                      <defs>
                        <filter
                          x="-0.8%"
                          y="-2.4%"
                          width="101.5%"
                          height="109.8%"
                          filterUnits="objectBoundingBox"
                          id="react-filter-159"
                        >
                          <feOffset
                            dx="0"
                            dy="2"
                            in="SourceAlpha"
                            result="shadowOffsetOuter1"
                          ></feOffset>
                          <feColorMatrix
                            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0"
                            type="matrix"
                            in="shadowOffsetOuter1"
                            result="shadowMatrixOuter1"
                          ></feColorMatrix>
                          <feMerge>
                            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                          </feMerge>
                        </filter>
                      </defs>
                      <g
                        id="Wayfarers"
                        filter="url(#react-filter-159)"
                        transform="translate(6.000000, 7.000000)"
                        fill="#252C2F"
                      >
                        <path
                          d="M34,41 L31.2421498,41 C17.3147125,41 9,33.3359286 9,20.5 C9,10.127 10.8170058,0 32.5299306,0 L35.4700694,0 C57.1829942,0 59,10.127 59,20.5 C59,32.5686429 48.7212748,41 34,41 Z M32.3853606,6 C13,6 13,12.8410159 13,21.5015498 C13,28.5719428 16.116254,37 30.9709365,37 L34,37 C46.3649085,37 55,30.6270373 55,21.5015498 C55,12.8410159 55,6 35.6146394,6 L32.3853606,6 Z"
                          id="Left"
                          fillRule="nonzero"
                        ></path>
                        <path
                          d="M96,41 L93.2421498,41 C79.3147125,41 71,33.3359286 71,20.5 C71,10.127 72.8170058,0 94.5299306,0 L97.4700694,0 C119.182994,0 121,10.127 121,20.5 C121,32.5686429 110.721275,41 96,41 Z M94.3853606,6 C75,6 75,12.8410159 75,21.5015498 C75,28.5719428 78.1194833,37 92.9709365,37 L96,37 C108.364909,37 117,30.6270373 117,21.5015498 C117,12.8410159 117,6 97.6146394,6 L94.3853606,6 Z"
                          id="Right"
                          fillRule="nonzero"
                        ></path>
                        <path
                          d="M2.95454545,5.77156439 C3.64590909,5.09629136 11.2095455,0 32.5,0 C50.3513636,0 54.1302273,1.85267217 59.8502273,4.6518809 L60.2689233,4.85850899 C60.6666014,4.99901896 62.7002447,5.68982981 65.0790606,5.76579519 C67.2462948,5.67278567 69.1000195,5.08540191 69.641698,4.89719767 C76.1703915,1.7220864 82.5610971,0 97.5,0 C118.790455,0 126.354091,5.09629136 127.045455,5.77156439 C128.679318,5.77156439 130,7.06150904 130,8.65734659 L130,11.5431288 C130,13.1389663 128.679318,14.428911 127.045455,14.428911 C127.045455,14.428911 120.143997,14.428911 120.143997,17.3146932 C120.143997,20.2004754 118.181818,13.1389663 118.181818,11.5431288 L118.181818,8.73240251 C114.578575,7.35340151 108.128411,4.78617535 97.5,4.78617535 C85.6584651,4.78617535 79.7610984,6.88602813 74.7022935,8.97112368 L74.7588636,9.10752861 L74.7563667,11.0937608 L72.5391666,16.4436339 L69.8004908,15.3608351 C69.5558969,15.2641292 69.0281396,15.090392 68.2963505,14.9099044 C66.256272,14.4067419 64.1589087,14.253569 62.3040836,14.6343084 C61.6235903,14.7739931 60.9922286,14.9836085 60.4128127,15.266732 L57.7704824,16.5578701 L55.1266751,11.3962031 L55.2440909,9.10175705 L55.3248203,8.90683855 C50.9620526,6.87386374 46.9392639,4.78617535 32.5,4.78617535 C21.8721459,4.78617535 15.422131,7.3524397 11.8181818,8.7314671 L11.8181818,11.5431288 C11.8181818,13.1389663 8.86363636,20.2004754 8.86363636,17.3146932 C8.86363636,14.428911 2.95454545,14.428911 2.95454545,14.428911 C1.32363636,14.428911 0,13.1389663 0,11.5431288 L0,8.65734659 C0,7.06150904 1.32363636,5.77156439 2.95454545,5.77156439 Z"
                          id="Stuff"
                          fillRule="nonzero"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
