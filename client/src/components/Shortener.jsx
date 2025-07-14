import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("API URL:", apiUrl);

export default function Shortener(props) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    function handleInputChange(e) {
        const { value } = e.target;
        setInput(value);
    }

    async function handleClick() {
        if (input === '') return;

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/`, {
                method: 'POST',
                body: JSON.stringify({ url: input }),
                headers: {
                    "Content-type": "application/json"
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Something went wrong');
                setInput("");
                setLoading(false);
                return;
            }

            const newItem = {
                url: input,
                shortUrl: data.shortUrl,
                clicks: data.clicks || 0
            };

            props.addLink(newItem);
            setInput("");
        } catch (err) {
            alert('Server Error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const override = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div className="shortener rounded-lg">
            <form>
                <div className="input-area">
                    <input
                        type="url"
                        placeholder="Short your link here..."
                        id="input"
                        onChange={handleInputChange}
                        value={input}
                    />
                    <p className="warning">Please add a link</p>
                </div>
                <button
                    className="btn-cta"
                    type="button"
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? (
                        <PulseLoader
                            color={'white'}
                            cssOverride={override}
                            size={11}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        'Short it!'
                    )}
                </button>
            </form>
        </div>
    );
}
