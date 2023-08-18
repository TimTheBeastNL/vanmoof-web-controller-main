import { Bike } from '../../lib/bike'
import { Button } from '../Button'
import { useState, FormEvent } from 'react'
import { FormError, FormSuccess } from '../Form'
import { Api } from '../../lib/api'
import { ShareDurationSlider } from './ShareDurationSlider'
import { P } from '../Spacing'

export function ShareBike({ bike, api }: { bike: Bike, api: Api }) {
    const [shareSuccessfull, setShareSuccessfull] = useState(false)
    const [error, setError] = useState<string>()
    const [shareinfo, setShareinfo] = useState({
        email: '',
        duration: undefined as undefined | number,
    })

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setError(undefined)
            setShareSuccessfull(false)
            await api.createBikeSharingInvitation(bike, shareinfo.email, shareinfo.duration)
            setShareSuccessfull(true)
        } catch (e) {
            setError(`${e}`)
        }
    }

    return (
        <div className='shareBike'>
            <h3>Share bike</h3>

            <form onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        className="inputMail"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={shareinfo.email}
                        onChange={e => setShareinfo(v => ({ ...v, email: e.target.value }))}
                        required
                    />

                    <P vertical="1rem">
                        <ShareDurationSlider
                            onChangeMinutes={e => setShareinfo(v => ({
                                ...v,
                                duration: e === undefined ? e : e * 60,
                            }))}
                        />
                    </P>

                    <Button
                        type="submit"
                        style={{ margin: "1rem" }}
                    >Share</Button>
                </div>

                <FormSuccess message={shareSuccessfull ? "Shared your bike successfully!" : undefined} />
                <FormError error={error} />
            </form>

            <style jsx>{`
                .shareBike {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }

                .label {
                    color: var(--label-color);
                    margin: 0;
                    font-size: 0.9rem;
                }

                .inputGroup {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .inputGroup label {
                    display: block;
                    font-size: 0.9rem;
                    color: var(--label-color);
                    padding-bottom: 4px;
                }

                .inputGroup .inputNumber {
                    width: 80%;
                }

                .inputGroup .inputCustom {
                    width: 20%;
                }

                .inputGroup .inputMail {
                    width: 100%;
                    color: var(--text-color);
                    padding: 10px;
                    font-size: 0.9rem;
                    border: 2px solid var(--border-color);
                    background-color: transparent;
                }

                .inputGroup .inputMail:focus {
                    border: 2px solid var(--active-color);
                    outline: none;
                }

                .inputGroup .inputMail {
                    background-color: rgba(0, 0, 0, .07);
                    color: var(--disabled-text-color);
                }
            `}</style>
        </div>
    )
}
