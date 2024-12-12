export default function ForumPage() {
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-[#f9f9f9] p-4 rounded-lg drop-shadow-md"
            >
                <h2 className="font-semibold text-xl text-center mb-6 underline">
                    Register Via DPIIT ID
                </h2>
                {error && (
                    <div className="text-center text-sm text-red-500">
                        {error}
                    </div>
                )}
                <div>
                    <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                        <label htmlFor="DPIITid">
                            <span className="text-red-500">* </span>
                            DPIIT ID:
                        </label>
                    </div>
                    <input
                        type="text"
                        className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                        required
                        name="DPIITid"
                        id="DPIITid"
                        value={inputs.id}
                        placeholder="Enter The ID issued by DPIIT"
                        onChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                id: e.target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
                        <label htmlFor="DPIITpassword">
                            <span className="text-red-500">* </span>
                            DPIIT password:
                        </label>
                    </div>
                    <input
                        type="password"
                        className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
                        required
                        name="DPIITpassword"
                        id="DPIITpassword"
                        value={inputs.password}
                        placeholder="Enter your DPIIT password"
                        onChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="w-full flex items-center justify-center mt-6">
                    <Button
                        className="text-[#f9f9f9] rounded-md h-[35px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
                        btnText="Submit"
                        type="submit"
                        disabled={disabled}
                    />
                </div>
            </form>
        </div>
    );
}
