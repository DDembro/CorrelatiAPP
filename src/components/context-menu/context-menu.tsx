"use client";

import React from "react";
import "../../styles/context-menu.css";
import { ContextMenuState } from "@/types/career-view-types";

const ContextMenu = ({
    contextMenuRef,
    contextMenu,
    buttons,
}: {
    contextMenuRef: React.RefObject<HTMLDivElement | null>;
    contextMenu: ContextMenuState;
    buttons: { text: string; onClick: Function; isSpacer?: boolean }[];
}) => {
    if (!contextMenu.toggled) return null;

    return (
        <menu
            style={{
                top: `${contextMenu.position.y}px`,
                left: `${contextMenu.position.x}px`,
            }}
            className={`context-menu ${contextMenu.toggled ? "active" : ""}`}
            ref={contextMenuRef}
        >
            {buttons.map((button, index) =>
                button.isSpacer ? (
                    <hr key={index} />
                ) : (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            button.onClick(contextMenu.subjectClicked);
                        }}
                        className="context-menu-button"
                    >
                        <span>{button.text}</span>
                    </button>
                )
            )}
        </menu>
    );
};

export default ContextMenu;
