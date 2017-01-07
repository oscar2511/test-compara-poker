<?php

namespace TestBundle\Lib;


class Card {

    private $number;
    private $suit;
    private $referenceValue;

    public function __construct($number, $suit)
    {
        $this->setNumber($number);
        $this->suit   = $suit;
    }

    /**
     * @return mixed
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * @param mixed $number
     */
    public function setNumber($number)
    {
        if ($number == 'J')
            $this->setReferenceValue(11);
        if ($number == 'Q')
            $this->setReferenceValue(12);
        if ($number == 'K')
            $this->setReferenceValue(13);
        if ($number == 'A')
            $this->setReferenceValue(14);

        if(!$this->referenceValue)
            $this->setReferenceValue( (int) $number );
        $this->number = $number;
    }

    /**
     * @return mixed
     */
    public function getSuit()
    {
        return $this->suit;
    }

    /**
     * @param mixed $suit
     */
    public function setSuit($suit)
    {
        $this->suit = $suit;
    }

    /**
     * @return mixed
     */
    public function getReferenceValue()
    {
        return $this->referenceValue;
    }

    /**
     * @param mixed $referenceValue
     */
    public function setReferenceValue($referenceValue)
    {
        $this->referenceValue = $referenceValue;
    }



}