"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SymptomInputFormProps {
  onAnalysis: (data: {
    name: string;
    age: string;
    gender: string;
    email: string;
    symptoms: string;
    medicalHistory: string;
  }) => void;
}

export const SymptomInputForm: React.FC<SymptomInputFormProps> = ({
  onAnalysis,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    symptoms: "",
    medicalHistory: "",
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      setError("You must accept our Privacy Policy to continue.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      onAnalysis(formData);
    } catch (err: any) {
      console.error("Error during symptom analysis:", err);
      setError("Failed to analyze symptoms. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="Enter your age"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <Label htmlFor="symptoms">Current Symptoms</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
              placeholder="Describe your symptoms in detail..."
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Medical History */}
          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => handleChange("medicalHistory", e.target.value)}
              placeholder="Share any relevant medical history, allergies, or current medications..."
              className="min-h-[100px]"
            />
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              id="privacy"
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={() => {
                setAcceptedPrivacy((prev) => !prev);
                setError(null);
              }}
              className="mt-1"
            />
            <label htmlFor="privacy" className="text-sm">
              I accept the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Inline Error Message */}
          {error && (
            <p className="text-red-600 text-sm mt-1">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing..." : "Begin Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
