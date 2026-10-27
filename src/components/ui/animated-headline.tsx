"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedHeadlineProps {
  prefix?: string
  words?: string[]
  className?: string
}

export function AnimatedHeadline({
  prefix = "Se cuidar é ainda melhor com",
  words,
  className = "",
}: AnimatedHeadlineProps) {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () =>
      words && words.length > 0
        ? words
        : ["ofertas exclusivas.", "condições especiais.", "acesso antecipado.", "cuidado de excelência."],
    [words]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2400)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <h1 id="hero-title" className={`animated-hero-title ${className}`}>
      <span className="hero-prefix">{prefix} </span>
      <span className="animated-word-container">
        &nbsp;
        {titles.map((title, index) => (
          <motion.em
            key={index}
            className="animated-word"
            initial={{ opacity: 0, y: "-80%" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            animate={
              titleNumber === index
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: titleNumber > index ? "-120%" : "120%",
                    opacity: 0,
                  }
            }
          >
            {title}
          </motion.em>
        ))}
      </span>
      <style jsx>{`
        .animated-hero-title {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: -1.8px;
          line-height: 1.15;
          margin-bottom: 24px;
          color: var(--ink, #32475c);
          font-size: clamp(38px, 4vw, 56px);
          max-width: 600px;
        }

        .hero-prefix {
          display: inline;
        }

        .animated-word-container {
          position: relative;
          display: inline-flex;
          vertical-align: baseline;
          overflow: hidden;
          min-width: 250px;
          height: 1.25em;
        }

        .animated-word {
          position: absolute;
          left: 0;
          top: 0;
          color: var(--blue, #456879);
          font-style: italic;
          font-weight: 400;
          white-space: nowrap;
        }

        @media (max-width: 767px) {
          .animated-hero-title {
            font-size: clamp(32px, 8.5vw, 48px);
            letter-spacing: -1.2px;
            margin-bottom: 20px;
          }
          .animated-word-container {
            min-width: 220px;
          }
        }
      `}</style>
    </h1>
  )
}
