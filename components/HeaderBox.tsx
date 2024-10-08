import React from 'react'

function HeaderBox({ type='title', title, subtext, user }: HeaderBoxProps) {
  return (
    <section className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">{"  "}{user}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </section>
  );
}

export default HeaderBox