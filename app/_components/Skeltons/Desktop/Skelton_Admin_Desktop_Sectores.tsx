import React from 'react'
import SkeltonInput from '../Skelton_Input'
import SubmitBtn from '../../SubmitBtn'
import PlusSVG from '@/app/_assets/PlusSVG'

const RUBROS = ["ragazzi", "patricios", "palihue", "jmolina"]

export default function SkeltonAdminDesktopSectores() {
    return (

        <article className="w-[90%] sm:w-[80%] mx-auto mt-4 sm:mt-12">

            <div className="sm:w-full flex justify-between items-center mb-12">
                <div
                    className={`badge-main w-3/8 sm:w-1/2 bg-foreground25`}
                >Sectores Actuales
                </div>

                <div
                    className={`badge-main w-3/8 sm:w-1/2`}
                >Sectores Constantes
                </div>
            </div>

            {
                RUBROS.map(rubro =>

                    <div key={rubro} className="flex flex-col border-b border-foreground25 last:border-b-0 py-4">
                        <div className="w-full flex items-center justify-between">
                            <span className="admin-sectores-rubro font-bold">{rubro}</span>
                            <div className="flex justify-center items-center gap-2 admin-sectores-new">
                                <input type="text" className="input-main w-40 py-1 text-center" name="newSector" placeholder="nuevo..." required />
                                <SubmitBtn isPending={false} className="h-9 w-9 flex justify-center items-center" classNameSVG="size-6">
                                    <PlusSVG className="size-6 p-0 text-foreground hover:text-foreground80" currentColor="currentColor" />
                                </SubmitBtn>
                            </div>
                        </div>

                        <div className="flex flex-wrap my-4 sectores-gap">
                            {
                                [0, 1, 2, 3].map((_, index) =>
                                    <SkeltonInput key={index} className={`w-32 h-8 ${rubro} rounded-xl`} />
                                )
                            }
                        </div>

                    </div>
                )
            }
        </article>
    )

}
