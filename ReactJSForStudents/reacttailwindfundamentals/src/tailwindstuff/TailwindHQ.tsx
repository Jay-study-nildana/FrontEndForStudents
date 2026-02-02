// ...existing code...
import React from "react";
import { Link } from "react-router-dom";

const TailwindHQ: React.FC = () => {
    return (
        <section className="prose lg:prose-xl p-6">
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-lg font-semibold text-gray-800">TailwindHQ Placeholder</h2>
                <p className="text-sm text-gray-500 mt-2">Replace with your component content.</p>

                <div className="mt-4 flex flex-col items-center gap-3">
                    <Link to="/tw/fundamentals" className="inline-block text-sm text-blue-600 hover:underline">
                        View fundamentals
                    </Link>
                    <Link to="/tw/dark-light-mode" className="inline-block text-sm text-blue-600 hover:underline">
                        View Dark / Light Mode (not working as of now)
                    </Link>
                    <Link to="/tw/layout-basics" className="inline-block text-sm text-blue-600 hover:underline">
                        View Layout Basics
                    </Link>
                    <Link to="/tw/flexbox-grid" className="inline-block text-sm text-blue-600 hover:underline">
                        View Flexbox & Grid
                    </Link>
                    <Link to="/tw/responsive-design" className="inline-block text-sm text-blue-600 hover:underline">
                        View Responsive Design
                    </Link>
                    <Link to="/tw/typography-showcase" className="inline-block text-sm text-blue-600 hover:underline">
                        View Typography Showcase
                    </Link>
                    <Link to="/tw/buttons-variants" className="inline-block text-sm text-blue-600 hover:underline">
                        View Buttons Variants
                    </Link>
                    <Link to="/tw/forms-inputs" className="inline-block text-sm text-blue-600 hover:underline">
                        View Forms & Inputs
                    </Link>
                    <Link to="/tw/cards-lists" className="inline-block text-sm text-blue-600 hover:underline">
                        View Cards & Lists
                    </Link>
                    <Link to="/tw/modals-popovers-dropdowns" className="inline-block text-sm text-blue-600 hover:underline">
                        View Modals, Popovers & Dropdowns
                    </Link>
                    <Link to="/tw/animations-motion" className="inline-block text-sm text-blue-600 hover:underline">
                        View Animations & Motion
                    </Link>
                    <Link to="/tw/state-driven-classes" className="inline-block text-sm text-blue-600 hover:underline">
                        View State Driven Classes
                    </Link>
                </div>
            </div>
            {/* link the fundamentals component here */}
            
        </section>
    );
};

export default TailwindHQ;
// ...existing code...