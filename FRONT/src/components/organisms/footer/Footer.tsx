import React from "react";

type FooterProps = {
    links: { label: string; href: string }[];
    copyright: string;
};

const Footer: React.FC<FooterProps> = ({ links, copyright }) => {
    return (
        <footer
            style={{
                backgroundColor: "rgb(108 111 118)",
                color: "white",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <div>
                {/* Links Section */}
                <nav>
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            style={{
                                color: "white",
                                textDecoration: "none",
                                margin: "0 10px",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Copyright Section */}
            <div style={{ marginTop: "10px", fontSize: "14px" }}>
                <blockquote>
                    "Study is the bridge between where you are and where you want to be"
                    <cite>— {copyright}</cite>
                </blockquote>
            </div>
        </footer>
    );
};

export default Footer;