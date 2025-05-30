"use client";

import { ArrowDownCircleIcon, EyeIcon, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';

const CreateAccount: React.FC = () => {
    const {
        signupForm,
        error,
        success,
        loading,
        isShowPassword,
        handleOnChange,
        handleCheckboxChange,
        handleSubmit,
        handleShowPassword
    } = useRegister();

    const inputStyle = `bg-transparent border border-black-tertiary text-sm text-gray-tertiary w-full py-3 px-4 rounded-md placeholder:text-sm placeholder:text-gray-primary outline-none focus:ring-2 focus:ring-inset focus:ring-black-tertiary`;

    return (
        <div className="relative min-h-screen overflow-hidden bg-black-primary flex justify-center items-center py-10">
            <form onSubmit={handleSubmit} className="bg-black-secondary px-5 py-10 max-w-xs md:max-w-lg w-full rounded-md border border-black-tertiary shadow-lg text-text-light flex flex-col items-center justify-center gap-5 z-10">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-2xl font-normal text-center text-text-light">Create a New Account</h1>
                    <span className="text-xs text-gray-quaternary text-center">Enter credentials to create a new account</span>
                </div>
                <div className="space-y-4 w-full">
                    <div className="space-y-4 w-full md:grid md:grid-cols-2 md:space-y-0 md:gap-3">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={signupForm.name}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={signupForm.email}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                    </div>
                    <div className="space-y-4 w-full md:grid md:grid-cols-2 md:space-y-0 md:gap-3">
                        <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={signupForm.phone}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                        <div className="relative w-full">
                            <select
                                name="userType"
                                value={signupForm.userType}
                                onChange={handleOnChange}
                                className={`${inputStyle} appearance-none pr-10`}
                            >
                                <option value="" disabled>Select User Type</option>
                                <option value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                                <option value="Agent">Agent</option>
                                <option value="Investor">Investor</option>
                            </select>
                            <ArrowDownCircleIcon
                                size={20}
                                className="absolute inset-y-0 right-3 translate-y-2/3 text-gray-tertiary pointer-events-none"
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Location (Optional)"
                        name="location"
                        value={signupForm.location}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                    <div className='gap-4 w-full relative'>
                        <input
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            name="password"
                            value={signupForm.password}
                            onChange={handleOnChange}
                            className={inputStyle}
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={handleShowPassword}
                        >
                            {isShowPassword ? <EyeIcon size={15} className='text-gray-quaternary' /> : <EyeOff size={15} className='text-gray-quaternary' />}
                        </span>
                    </div>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Confirm Your Password"
                        name="confirmPassword"
                        value={signupForm.confirmPassword}
                        onChange={handleOnChange}
                        className={inputStyle}
                    />
                </div>
                <div className="flex items-center justify-center space-x-2">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={signupForm.terms}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                    />
                    <label className="text-xs text-gray-quaternary">
                        I agree to the terms and conditions
                    </label>
                </div>
                {error && <span className="text-red-500 text-xs">{error}</span>}
                {success && <span className="text-green-500 text-xs">{success}</span>}
                <div className="space-y-2 w-full">
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-primary text-white rounded-md focus:ring-2 focus:ring-purple-primary transition-all"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <div className="flex justify-between w-full text-xs text-gray-quaternary mt-3">
                        <Link href="/contact">
                            Need Help?
                        </Link>
                        <Link href="/auth/login">
                            Already have an Account? Log In
                        </Link>
                    </div>
                </div>
            </form>

            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary -translate-x-1/2 -translate-y-1/4 h-48 w-48 md:w-96 md:h-96 top-0 left-0 rounded-full blur-3xl z-0"></span>
            <span className="absolute bg-gradient-to-br from-purple-primary to-black-tertiary translate-x-1/2 translate-y-1/4 h-48 w-48 md:w-96 md:h-96 bottom-0 right-0 rounded-full blur-3xl z-0"></span>
        </div>
    );
};

export default CreateAccount;