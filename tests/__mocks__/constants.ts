// cspell: disable
export const TOP_LANGS = `
      <svg
        width="300"
        height="285"
        viewBox="0 0 300 285"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId"></title>
        <desc id="descId"></desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #2f80ed;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }

    @keyframes slideInAnimation {
      from {
        width: 0;
      }
      to {
        width: calc(100%-100px);
      }
    }
    @keyframes growWidthAnimation {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #434d58;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .bold { font-weight: 700 }
    .lang-name {
      font: 400 11px "Segoe UI", Ubuntu, Sans-Serif;
      fill: #434d58;
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }



      /* Animations */
      @keyframes scaleInAnimation {
        from {
          transform: translate(-5px, 5px) scale(0);
        }
        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }
      @keyframes fadeInAnimation {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }


        </style>



        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          stroke="#e4e2e2"
          width="299"
          fill="#fffefe"
          stroke-opacity="1"
        />


      <g
        data-testid="card-title"
        transform="translate(25, 35)"
      >
        <g transform="translate(0, 0)">
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >Most Used Languages</text>
    </g>
      </g>


        <g
          data-testid="main-card-body"
          transform="translate(0, 55)"
        >

    <svg data-testid="lang-items" x="25">
      <g transform="translate(0, 0)">
    <g class="stagger" style="animation-delay: 450ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">TypeScript</text>
      <text x="215" y="34" class="lang-name">50.41%</text>

    <svg width="205" x="0" y="25">
      <rect rx="5" ry="5" x="0" y="0" width="205" height="8" fill="#ddd"></rect>
      <svg data-testid="lang-progress" width="50.41%">
        <rect
            height="8"
            fill="#3178c6"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: 750ms;"
        />
      </svg>
    </svg>

    </g>
  </g><g transform="translate(0, 40)">
    <g class="stagger" style="animation-delay: 600ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">Solidity</text>
      <text x="215" y="34" class="lang-name">38.55%</text>

    <svg width="205" x="0" y="25">
      <rect rx="5" ry="5" x="0" y="0" width="205" height="8" fill="#ddd"></rect>
      <svg data-testid="lang-progress" width="38.55%">
        <rect
            height="8"
            fill="#AA6746"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: 900ms;"
        />
      </svg>
    </svg>

    </g>
  </g><g transform="translate(0, 80)">
    <g class="stagger" style="animation-delay: 750ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">JavaScript</text>
      <text x="215" y="34" class="lang-name">9.54%</text>

    <svg width="205" x="0" y="25">
      <rect rx="5" ry="5" x="0" y="0" width="205" height="8" fill="#ddd"></rect>
      <svg data-testid="lang-progress" width="9.54%">
        <rect
            height="8"
            fill="#f1e05a"
      </svg>
    </svg>

    </g>
  </g><g transform="translate(0, 120)">
    <g class="stagger" style="animation-delay: 900ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">HTML</text>
      <text x="215" y="34" class="lang-name">0.92%</text>

    <svg width="205" x="0" y="25">
      <rect rx="5" ry="5" x="0" y="0" width="205" height="8" fill="#ddd"></rect>
      <svg data-testid="lang-progress" width="2%">
        <rect
            height="8"
            fill="#e34c26"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: 1200ms;"
        />
      </svg>
    </svg>

    </g>
  </g><g transform="translate(0, 160)">
    <g class="stagger" style="animation-delay: 1050ms">
      <text data-testid="lang-name" x="2" y="15" class="lang-name">CSS</text>
      <text x="215" y="34" class="lang-name">0.58%</text>

    <svg width="205" x="0" y="25">
      <rect rx="5" ry="5" x="0" y="0" width="205" height="8" fill="#ddd"></rect>
      <svg data-testid="lang-progress" width="2%">
        <rect
            height="8"
            fill="#563d7c"
            rx="5" ry="5" x="0" y="0"
            class="lang-progress"
            style="animation-delay: 1350ms;"
        />
      </svg>
    </svg>

    </g>
  </g>
    </svg>

        </g>
      </svg>`;

export const STATS = `<svg
        width="450"
        height="195"
        viewBox="0 0 450 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId">Keyrxng's GitHub Stats, Rank: A</title>
        <desc id="descId">Total Stars Earned: 56, Total Commits in 2024 : 864, Total PRs: 153, Total Issues: 77, Contributed to (last year): 46</desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #2f80ed;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }

    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #434d58;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #434d58;
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .rank-percentile-header {
      font-size: 14px;
    }
    .rank-percentile-text {
      font-size: 16px;
    }

    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: #4c71f2;
      display: none;
    }

    .rank-circle-rim {
      stroke: #2f80ed;
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: #2f80ed;
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }

    @keyframes rankAnimation {
      from {
        stroke-dashoffset: 251.32741228718345;
      }
      to {
        stroke-dashoffset: 59.16891617600176;
      }
    }




      /* Animations */
      @keyframes scaleInAnimation {
        from {
          transform: translate(-5px, 5px) scale(0);
        }
        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }
      @keyframes fadeInAnimation {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }


        </style>



        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          stroke="#e4e2e2"
          width="449"
          fill="#fffefe"
          stroke-opacity="1"
        />


      <g
        data-testid="card-title"
        transform="translate(25, 35)"
      >
        <g transform="translate(0, 0)">
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >Keyrxng's GitHub Stats</text>
    </g>
      </g>


        <g
          data-testid="main-card-body"
          transform="translate(0, 55)"
        >

    <g data-testid="rank-circle"
          transform="translate(365, 47.5)">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">

        <text x="-5" y="3" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="level-rank-icon">
          A
        </text>

        </g>
      </g>
    <svg x="0" y="0">
      <g transform="translate(0, 0)">
    <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">

      <text class="stat  bold"  y="12.5">Total Stars Earned:</text>
      <text
        class="stat  bold"
        x="199.01"
        y="12.5"
        data-testid="stars"
      >56</text>
    </g>
  </g><g transform="translate(0, 25)">
    <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">

      <text class="stat  bold"  y="12.5">Total Commits (2024):</text>
      <text
        class="stat  bold"
        x="199.01"
        y="12.5"
        data-testid="commits"
      >864</text>
    </g>
  </g><g transform="translate(0, 50)">
    <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 0)">

      <text class="stat  bold"  y="12.5">Total PRs:</text>
      <text
        class="stat  bold"
        x="199.01"
        y="12.5"
        data-testid="prs"
      >153</text>
    </g>
  </g><g transform="translate(0, 75)">
    <g class="stagger" style="animation-delay: 900ms" transform="translate(25, 0)">

      <text class="stat  bold"  y="12.5">Total Issues:</text>
      <text
        class="stat  bold"
        x="199.01"
        y="12.5"
        data-testid="issues"
      >77</text>
    </g>
  </g><g transform="translate(0, 100)">
    <g class="stagger" style="animation-delay: 1050ms" transform="translate(25, 0)">

      <text class="stat  bold"  y="12.5">Contributed to (last year):</text>
      <text
        class="stat  bold"
        x="199.01"
        y="12.5"
        data-testid="contribs"
      >46</text>
    </g>
  </g>
    </svg>

        </g>
      </svg>`;
