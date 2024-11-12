const FooterComponent = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-4">
            <div className="container mx-auto flex flex-col items-center px-4 space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
                
                {/* Branding */}
                <div className="text-lg font-semibold text-teal-400">
                    StayFinder
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
