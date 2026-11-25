import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import PlayItem from "./playitem";
import internshipImage from "/playbook/2024-05-30-reflections-and-insights-on-my-internship-at-weaviate/img/hero.jpg";
import cultureImage from "/playbook/2023-11-28-from-sunday-nights-blues-to-monday-morning-cheers-the magic-of-company-culture/img/hero.jpeg";
import peopleOpsImage from "/playbook/2023-09-20-i-recently-onboarded-myself-introducing-people-operations/img/hero.jpeg";

const posts = [
  {
    link: "/company/playbook/reflections-and-insights-on-my-internship-at-weaviate",
    type: "Blog",
    backgroundImage: internshipImage,
    tagline: "Reflections and insights on my internship at Weaviate",
    photo: "ajit.jpg",
    name: "Ajit Mistry",
    title: "Developer Growth Intern",
    date: "May 30, 2024",
  },
  {
    link: "/company/playbook/from-sunday-nights-blues-to-monday-morning-cheers-the%20magic-of-company-culture",
    type: "Blog",
    backgroundImage: cultureImage,
    tagline: "From Sunday night blues to Monday morning cheers - The magic of company culture",
    photo: "jessie.jpg",
    name: "Jessie de Groot",
    title: "Head of People and Culture",
    date: "November 28, 2023",
  },
  {
    link: "/company/playbook/i-recently-onboarded-myself-introducing-people-operations",
    type: "Blog",
    backgroundImage: peopleOpsImage,
    tagline: "I recently onboarded myself - Introducing People Operations",
    photo: "ara.jpg",
    name: "Ara Gonzalez",
    title: "People Operations Manager",
    date: "September 20, 2023",
  },
];

export default function Playbook() {
  return (
    <section className={styles.playbook}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Playbook</h2>
          <p className={styles.subtitle}>
            In order to stay true to the open-source spirit as we grow, in this
            blog we want to share our company vision, culture and insights.
          </p>
        </div>
        <div className={styles.latestModule}>
          {posts.map((post) => {
            return <PlayItem key={post.link} details={post} />;
          })}
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonOutline} to="/company/playbook">
            Go to Playbook
          </Link>
        </div>
      </div>
    </section>
  );
}
