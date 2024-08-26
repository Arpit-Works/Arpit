import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
    const aboutRef = useRef<HTMLElement>(null);
    const experienceRef = useRef<HTMLElement>(null);
    const projectRef = useRef<HTMLElement>(null);

    const sections = useMemo(() => [aboutRef, experienceRef, projectRef], []);
    const navItems = useMemo(() => ['#about', '#experience', '#project'], []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const sectionOffsets = sections.map((ref) => ref.current?.offsetTop || 0);
            const sectionHeights = sections.map((ref) => ref.current?.offsetHeight || 0);

            let newActiveSection = '';

            for (let i = 0; i < sectionOffsets.length; i++) {
                if (
                    scrollY >= sectionOffsets[i] &&
                    scrollY < sectionOffsets[i] + sectionHeights[i]
                ) {
                    newActiveSection = navItems[i];
                    break;
                }
            }

            if (newActiveSection) {
                setActiveSection(newActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, navItems, setActiveSection]);

    const handleClick = (link: string, ref: React.RefObject<HTMLElement>) => {
        setActiveSection(link);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [text] = useTypewriter({
        words: ['Front End Developer', 'Back End Developer'],
        loop: 0,
        typeSpeed: 100,
        deleteSpeed: 50,
        delaySpeed: 1000,
    });

    const linkClasses = (id: string) => `flex items-center p-2 group ${activeSection === id ? 'text-lime-200' : ''}`;
    const divClasses = (id: string) => `hidden lg:block w-12 h-[2px] rounded bg-gray-400 mr-4 group-hover:bg-lime-200 group-hover:w-28 ${activeSection === id ? 'w-28 bg-lime-200' : ''} transition-all duration-300`;
    const spanClasses = (id: string) => `group-hover:text-lime-200 ${activeSection === id ? 'text-lime-200 text-lg font-bold' : ''} transition-all duration-300`;

    return (
        <div className='px-4 py-8 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24'>
            <h1 className="text-white text-3xl font-bold sm:text-4xl lg:text-5xl">Arpit Vishwakarma</h1>
            <p className='mt-3 min-w-64 text-lg font-medium sm:text-lg lg:text-xl'>
                I&apos;m a <span className='text-lime-100'>{text}</span><Cursor />
            </p>
            <nav className='mt-8 lg:mt-16 lg:block'>
                <ul className='flex flex-row justify-between lg:flex-col lg:w-max'>
                    {navItems.map((item, index) => (
                        <Link
                            key={item}
                            href={item}
                            className={linkClasses(item)}
                            onClick={() => handleClick(item, sections[index])}
                        >
                            <div className={divClasses(item)}></div>
                            <span className={spanClasses(item)}>{item.replace('#', '').toUpperCase()}</span>
                        </Link>
                    ))}
                </ul>
            </nav>
            <div className='mt-8 flex justify-center lg:justify-start lg:mt-52'>
                <Link href='https://github.com/ArpitVK' className='mr-4 hover:text-lime-200' target='_blank'>
                    <FontAwesomeIcon icon={faGithub} size='2x' />
                </Link>
                <Link href='https://www.linkedin.com/in/arpit-vishwakarma23/' className='mr-4 hover:text-lime-200' target='_blank'>
                    <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </Link>
                <Link href='https://www.instagram.com/arpit23___/' className='mr-4 hover:text-lime-200' target='_blank'>
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                </Link>
                <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=vishwakarmaarpit621@gmail.com" className='mr-4 hover:text-lime-200' target='_blank'>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                </Link>
            </div>
        </div>
    );
}
