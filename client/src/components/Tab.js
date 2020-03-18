import React from "react";
import faker from "faker";
import ContactForm from "./ContactForm";

export const Tab = () => {
  const [selectedTab, setTab] = React.useState(1);
  // props = {
  // label: string
  // isSelected: boolean
  // setTab: (tabNumber: number) => any;
  //}
  return (
    <>
      <div className="tabs">
        <button
          onClick={() => setTab(1)}
          className={selectedTab === 1 ? "tab btn primary" : "tab btn"}
        >
          About Us
        </button>
        <button
          onClick={() => setTab(2)}
          className={selectedTab === 2 ? "tab btn primary" : "tab btn"}
        >
          Contact Us
        </button>
        <button
          onClick={() => setTab(3)}
          className={selectedTab === 3 ? "tab btn primary" : "tab btn"}
        >
          Us
        </button>
      </div>
      <div className="content p-3">
        {selectedTab === 1 && (
          <div>
            <h1>WHAT WE ARE ABOUT</h1>
            <p className="p-3">{faker.lorem.paragraphs(4)}</p>
            <p className="article">{faker.lorem.paragraphs(2)}</p>
          </div>
        )}
        {selectedTab === 2 && <ContactForm />}
        {selectedTab === 3 && (
          <div className="avatars">
            {[...new Array(10)].map((_, i) => (
              <img
                className="avatar"
                key={i}
                src={faker.internet.avatar()}
                alt={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
