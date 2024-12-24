
export default function Banner() {
    return (
        <div
            className="relative bg-cover bg-center min-h-[calc(100vh-4.1rem)] flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMXx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Capturing Your Most Beautiful Moments
                </h1>
                <p className="text-lg sm:text-2xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Let us make your special day unforgettable
                </p>
            </div>
        </div>
    )
}
