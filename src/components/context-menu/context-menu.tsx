"use client"

import "../styles/context-menu.css"

import React from 'react'

const ContextMenu = ({
    contextMenuRef,
    rightClickItem,
    positionX,
    positionY,
    isToggled,
    buttons
}:any 
) => {
    return (
        <menu
            style={{
                top: positionY + 2 + 'px',
                left: positionX + 2 + 'px',

            }}
            className={`context-menu ${isToggled? "active" : ""}`}
            ref={contextMenuRef}
        >
            {buttons.map((button:any, index:any) => {
                
                const handleClick = (e:any) => {
                    e.stopPropagation()
                    button.onClick(e, rightClickItem)
                }

                if (button.isSpacer) return <hr key={index}></hr>

                return (
                    <button 
                        key={index}
                        onClick={handleClick}
                        className='context-menu-button'
                    >
                        <span> {button.text} </span>
                    </button>
                )
            })}
        </menu>
    )
}

export default ContextMenu