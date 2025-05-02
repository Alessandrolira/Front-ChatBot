"use client"

import { useState } from "react"

interface ConversasProps {
    nomeUser: string
    ultima_mensagemUser?: string
    numeroUser?: number | any
    dataUser?: number
    numeroSelecionado?: any
    funcaoScroll?: any
    checkado?: any
    funcaoCheck?: any
}

export default function Conversas( {nomeUser, ultima_mensagemUser, numeroUser, dataUser, numeroSelecionado, funcaoScroll, checkado, funcaoCheck} : ConversasProps) {

    return (
        <>
            <div className="bg-(--background) pt-[1em] pb-[1em] pl-[2em] pr-[2em] border-2 border-(--cinza2) flex items-center">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center">
                        <div className="rounded-full w-[3em] h-[3em] bg-(--branco) mr-[2em]"></div>
                        <div>
                            <h2>{nomeUser}</h2>
                            <p className="text-[0.7em] mt-[0.5em] line-clamp-2 w-45">{ultima_mensagemUser}</p>
                            <p className="text-[0.8em] mt-[0.5em]">{numeroUser}</p>
                            <div className="flex">
                                <p className="text-[0.6em] mt-[0.5em]">{dataUser}</p>
                            </div>
                        </div>
                    </div>
                    {numeroSelecionado != null ? (
                        <div className="flex items-center">
                            <label className="switch">
                                <input type="checkbox" id="switch" onChange={funcaoCheck} checked={checkado}/>
                                <span className="slider"></span>
                            </label>
                            <button onClick={funcaoScroll} className="top-43.5 right-10 text-white flex items-center">
                                <img src="/arrow-down.png" alt="" className="bg-(--cinza) rounded-full shadow-lg hover:bg-(--branco) transition cursor-pointer p-3"/>
                            </button>
                        </div>
                    ) :""}
                </div>
            </div>
        </>
    )
}
