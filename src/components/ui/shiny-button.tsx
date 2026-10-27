"use client"

import type React from "react"

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, onClick, className = "", disabled, ...props }: ShinyButtonProps) {
  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          /* Paleta oficial AdClinic: Ink (#32475C), Blue (#456879), Mist (#BAD6DA), Champagne (#EEE3D0) */
          --shiny-cta-bg: #32475c;
          --shiny-cta-bg-subtle: #243545;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: #bad6da;
          --shiny-cta-highlight-subtle: #eee3d0;
          --animation: gradient-angle linear infinite;
          --duration: 3.5s;
          --shadow-size: 2px;
          --transition: 600ms cubic-bezier(0.25, 1, 0.5, 1);
          
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1rem 2rem;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.3;
          font-weight: 600;
          letter-spacing: 0.5px;
          border: 1px solid rgba(186, 214, 218, 0.3);
          border-radius: 9999px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              var(--gradient-shine) calc(var(--gradient-percent) * 2),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
              transparent calc(var(--gradient-percent) * 4)
            ) border-box;
          box-shadow: 0 4px 20px rgba(50, 71, 92, 0.15), inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine, transform, box-shadow;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active:not(:disabled) {
          translate: 0 1px;
        }

        .shiny-cta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          filter: grayscale(0.5);
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            rgba(238, 227, 208, 0.4) calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.35;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            rgba(186, 214, 218, 0.4),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.5;
        }

        .shiny-cta span {
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px rgba(186, 214, 218, 0.4);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        /* Animate */
        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation: var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible):not(:disabled) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
          box-shadow: 0 8px 25px rgba(50, 71, 92, 0.25), inset 0 0 0 1px var(--shiny-cta-highlight);
          transform: translateY(-2px);
        }

        .shiny-cta:is(:hover, :focus-visible):not(:disabled),
        .shiny-cta:is(:hover, :focus-visible):not(:disabled)::before,
        .shiny-cta:is(:hover, :focus-visible):not(:disabled)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible):not(:disabled) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from, to {
            scale: 1;
          }
          50% {
            scale: 1.15;
          }
        }
      `}</style>

      <button className={`shiny-cta ${className}`} onClick={onClick} disabled={disabled} {...props}>
        <span>{children}</span>
      </button>
    </>
  )
}
