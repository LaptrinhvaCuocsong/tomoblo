import React from "react"
import {
    FaGithubSquare,
    FaFacebookSquare
} from "react-icons/fa"
import "./sidebar.scss"


const SocialLinks = ({ contacts }) => {
    return (
        <div className="sidebar-social-links">
            <a className="text-secondary p-2"
                href={contacts.facebook}>
                <span title="Facebook">
                    <FaFacebookSquare size={26} style={{ color: "secondary" }} />
                </span>
            </a>
            <a className="text-secondary p-2"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{ color: "secondary" }} />
                </span>
            </a>
        </div>
    )
}

export default SocialLinks
