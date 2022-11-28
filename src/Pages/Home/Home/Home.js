import React from 'react';
import AdvSection from '../AdvSection/AdvSection';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import ExtraSection from '../ExtraSection/ExtraSection';
import WhyUs from '../WhyUs/WhyUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <AdvSection></AdvSection>
            <ExtraSection></ExtraSection>
            <WhyUs></WhyUs>
        </div>
    );
};

export default Home;