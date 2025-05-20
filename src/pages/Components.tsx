import React, { useState } from "react";
import { CustomButton } from "../components/ui/custom-button";
import { CustomInput } from "../components/ui/custom-input";
import { CustomModal } from "../components/ui/custom-modal";
import { Search } from "lucide-react";

const ComponentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("12:00");

  return (
    <div className="space-y-4 p-8 pt-6 bg-background text-foreground min-h-screen">
      <div className="space-y-12">
        {/* Buttons Section */}
        <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Buttons</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton variant="primary">Primary</CustomButton>
                <CustomButton variant="secondary">Secondary</CustomButton>
                <CustomButton variant="destructive">Destructive</CustomButton>
                <CustomButton variant="outline">Outline</CustomButton>
                <CustomButton variant="ghost">Ghost</CustomButton>
                <CustomButton variant="link">Link</CustomButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <CustomButton size="xs">Extra Small</CustomButton>
                <CustomButton size="sm">Small</CustomButton>
                <CustomButton size="md">Default</CustomButton>
                <CustomButton size="lg">Large</CustomButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <CustomButton disabled>Disabled</CustomButton>
                <CustomButton isLoading>Loading</CustomButton>
                <CustomButton className="animate-pulse">Animated</CustomButton>
              </div>
            </div>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Input Fields</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput label="Default Input" placeholder="Enter text" />

            <CustomInput
              label="With Icon"
              placeholder="Search..."
              icon={<Search size={16} />}
            />

            <CustomInput
              label="Disabled Input"
              placeholder="Disabled input"
              disabled
            />

            <CustomInput
              label="Input with Error"
              placeholder="Error input"
              error="This field is required"
            />

            <CustomInput
              label="Success Input"
              value="Valid input"
              success="Validation passed"
            />

            <CustomInput
              type="password"
              label="Password Input"
              placeholder="Enter password"
            />
          </div>
        </section>

        {/* Modal Section */}
        <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Modal</h2>

          <CustomButton onClick={() => setIsModalOpen(true)}>
            Open Modal
          </CustomButton>

          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal Title"
            footer={
              <div className="flex justify-end gap-2">
                <CustomButton
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton onClick={() => setIsModalOpen(false)}>
                  Confirm
                </CustomButton>
              </div>
            }
          >
            <p className="text-muted-foreground">
              This is a custom modal built with Tailwind CSS. You can put any
              content here. This modal has a title, content area, and footer
              with action buttons.
            </p>
          </CustomModal>
        </section>

        {/* Date & Time Pickers Section */}
        <section className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Date & Time Pickers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Picker */}
            <CustomInput label="Date Picker" type="date" />

            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date Range Picker
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Start date"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="End date"
                />
              </div>
            </div>

            {/* Time Picker */}
            <CustomInput
              label="Time Picker"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentsPage;
